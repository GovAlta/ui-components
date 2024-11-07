type NoScrollOptions = {
  enable: boolean;
};

export default function (_node: HTMLElement, opts: NoScrollOptions) {
  let toggledScrolling = false;

  function isScrollable() {
    return document.body.style.overflow !== "hidden";
  }

  function resetScrollbars() {
    if (!toggledScrolling) {
      return;
    }

    toggledScrolling = false;
    // need to perform on the next render cycle to allow the css transitions to take place
    setTimeout(() => {
      document.body.style.overflow = "";
      document.body.style.borderRight = "";
    }, 200);
  }

  function hideScrollbars() {
    if (!isScrollable()) {
      return;
    }
    const scrollbarWidth = calculateScrollbarWidth();
    toggledScrolling = true;
    document.body.style.overflow = "hidden";
    document.body.style.borderRight = `${scrollbarWidth}px solid #eee`;
  }

  function calculateScrollbarWidth() {
    // no scrollbars present
    if (document.body.clientHeight <= document.documentElement.clientHeight) {
      return 0;
    }

    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll";
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement("div");
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode?.removeChild(outer);

    return scrollbarWidth;
  }

  return {
    update(options: NoScrollOptions) {
      if (options.enable) {
        hideScrollbars();
      } else {
        resetScrollbars();
      }
    },

    destroy() {
      resetScrollbars();
    },
  };
}
