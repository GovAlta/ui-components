export function isUrlMatch(windowUrl: URL | Location, testUrl: string): number {
  // path match
  if (testUrl === undefined) return -1;

  // Handle hash links
  if (windowUrl.hash.length > 0 && windowUrl.hash === testUrl) {
    return 1;
  }

  // Parse the test URL
  let parsedTestUrl: URL;
  try {
    parsedTestUrl = new URL(testUrl, windowUrl.origin);
  } catch {
    // If parsing fails, fall back to path-only comparison
    const windowUrlParts = windowUrl.pathname.replace(/^\//, "").split("/");
    const urlParts = testUrl.replace(/^\//, "").split("/");

    if (windowUrlParts.length < urlParts.length) {
      return -1;
    }

    let weight = -1;
    let index = 0;

    for (const part of urlParts) {
      if (windowUrlParts[index] !== part) {
        return -1;
      }
      weight += 1;
      index++;
    }

    return weight >= 0 ? weight + 1 : weight;
  }

  // Compare pathnames
  const windowUrlParts = windowUrl.pathname.replace(/^\//, "").split("/");
  const testUrlParts = parsedTestUrl.pathname.replace(/^\//, "").split("/");

  if (windowUrlParts.length < testUrlParts.length) {
    return -1;
  }

  let weight = -1;
  let index = 0;

  // Compare path parts
  for (const part of testUrlParts) {
    if (windowUrlParts[index] !== part) {
      // Ex: windowURl: /get-started/designers should match to a menu "/#/get-started, but not match to "/get-started/developers
      // So if we check by menu (linkParts) and have anything not matched, it should return -1 (not matched), otherwise menu /get-started/developers & menu /get-started/ will have the same weight
      return -1;
    }
    weight += 1;
    index++;
  }

  // if weight was incremented once, then it actually has a value of 1, not 0
  // Compare query parameters if present in test URL
  const testParams = new URLSearchParams(parsedTestUrl.search);
  const windowParams = new URLSearchParams(windowUrl.search);

  if (testParams.toString()) {
    let allParamsMatch = true;
    for (const [key, value] of testParams) {
      if (windowParams.get(key) !== value) {
        allParamsMatch = false;
        break;
      }
    }

    // If query parameters are specified but don't match, return -1
    if (!allParamsMatch) {
      return -1;
    }

    // Add additional weight for matching query parameters
    weight += testParams.toString().length > 0 ? 1 : 0;
    //weight += 1;
  }

  return weight >= 0 ? weight + 1 : weight;
}

export function getMatchedLink(links: Element[], windowUrl: URL | Location) {
  const weights = links.map((link) => {
    if (link.getAttribute("target")) return -1;
    return isUrlMatch(
      windowUrl,
      (link as HTMLLinkElement).getAttribute("href") || "",
    );
  });

  // If all weights are the same or duplicated, and there are multiple links, return null.Ex: [1,1,1,-1,-1] we will return null
  const maxWeight = Math.max(...weights);
  if (weights.filter((weight) => weight === maxWeight).length > 1) {
    return null;
  }

  const indexOfMaxWeight = weights.indexOf(maxWeight);
  if (indexOfMaxWeight > -1) {
    return links[indexOfMaxWeight];
  }

  return null;
}
