export function isUrlMatch(windowUrl: URL | Location, testUrl: string): number {
  // path match
  if (testUrl === undefined) return -1;

  const windowUrlParts = windowUrl.pathname.replace(/^\//, "").split("/");
  const urlParts = testUrl.replace(/^\//, "").split("/");

  if (windowUrlParts.length < urlParts.length) {
    return -1;
  }

  // hash
  if (windowUrl.hash.length > 0 && windowUrl.hash === testUrl) {
    return 1;
  }

  // root url
  if (urlParts.length === 1 && urlParts[0] === "") {
    return 0;
  }

  let weight = -1;
  let index = 0;

  for (const part of windowUrlParts) {
    if (urlParts[index] !== part) {
      break;
    }
    weight += 1;
    index++;
  }

  // if weight was incremented once, then it actually has a value of 1, not 0
  return weight >= 0 ? weight + 1 : weight;
}

function findMaxIndexMatchedToWindowUrlParts(windowUrlParts: string[], urlParts: string[]) {

  for (let urlPartsIndex = 0; urlPartsIndex < urlParts.length; urlPartsIndex++) {
    for (let windowUrlPartsIndex = 0; windowUrlPartsIndex < windowUrlParts.length; windowUrlPartsIndex++) {
      const cleanedWindowUrlPart = windowUrlParts[windowUrlPartsIndex].split("#")[0];
      const cleanedUrlPart = urlParts[urlPartsIndex].split("#")[0];
      if (cleanedUrlPart === cleanedWindowUrlPart) {
        return windowUrlPartsIndex;
      }
    }
  }
  return -1;
}

function getUrlWeight(windowUrl: string, linkHref: string) {
  const windowParts = decodeURIComponent(windowUrl).replace(/^\/#?/, "").split("/");
  const linkParts = decodeURIComponent(linkHref).replace(/^\//, "").split("/");



  let startIndex = findMaxIndexMatchedToWindowUrlParts(windowParts, linkParts);
  if (startIndex === -1) {
    return -1;
  }
  // Weight should start with matched index on windowUrl. Ex: window.pathname="/ui-components/#/", linkHref="#/", Home menu should have higher weight than the rest
  let weight = startIndex;

  for (let i = 0; i < linkParts.length && startIndex < windowParts.length; i++) {
    const cleanedWindowPartStr = windowParts[startIndex].split("#")[0];
    const cleanedLinkPartStr = linkParts[i].split("#")[0];
    if (cleanedWindowPartStr === cleanedLinkPartStr) {
      // Increase weight for each matching segment
      weight += 1;
    } else {
      // Break loop on first non-match
      break;
    }
    startIndex++;
  }

  return weight;
}

export function getMatchedLink(links: Element[], windowUrl: string) {
  const weights = links.map((link) => {
    if (link.getAttribute("target")) return -1;
    return getUrlWeight(
        windowUrl,
        (link as HTMLLinkElement).getAttribute("href") || "",
      )
  }
  );
  const maxWeight = Math.max(...weights);
  if (weights.filter(weight => weight === maxWeight).length > 1) {
    // // If all weights are the same or duplicated and there are multiple links, return null
    return null;
  }
  const indexOfMaxWeight = weights.indexOf(maxWeight);
  if (indexOfMaxWeight > -1) {
    return links[indexOfMaxWeight];
  }

  return null;
}
