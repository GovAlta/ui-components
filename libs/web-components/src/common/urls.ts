export function isUrlMatch(windowUrl: URL | Location, testUrl: string): number {
  // path match
  if (testUrl === undefined) return -1;

  let testPathname;
  try {
    const testUrlObj = new URL(testUrl, window.location.origin);
    testPathname = testUrlObj.pathname;
  } catch (e) {
    testPathname = testUrl.split(/[?#]/)[0];
  }

  const windowUrlParts = windowUrl.pathname.replace(/^\//, "").split("/");
  const urlParts = testPathname.replace(/^\//, "").split("/");

  if (windowUrlParts.length < urlParts.length) {
    return -1;
  }

  // hash
  if (windowUrl.hash.length > 0 && windowUrl.hash === testUrl) {
    return 1;
  }

  let weight = -1;
  let index = 0;

  for (const part of urlParts) {
    if (windowUrlParts[index] !== part) {
      // Ex: windowURl: /get-started/designers should match to a menu "/#/get-started, but not match to "/get-started/developers
      // So if we check by menu (linkParts) and have anything not matched, it should return -1 (not matched), otherwise menu /get-started/developers & menu /get-started/ will have the same weight
      return -1;
    }
    weight += 1;
    index++;
  }

  // if weight was incremented once, then it actually has a value of 1, not 0
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

export function watchPathChanges(
  observer: MutationObserver | null,
  action: () => void,
) {
  let currentLocation = document.location.href;
  observer = new MutationObserver((_mutationList) => {
    if (isUrlMatch(document.location, currentLocation)) {
      currentLocation = document.location.href;
      action();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

export function stopWatchingPathChanges(observer: MutationObserver | null) {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}
