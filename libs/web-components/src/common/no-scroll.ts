export default function(_node: HTMLElement, opts: { enable: boolean }) {

  function hideScrollbars() {
    const scrollbarWidth = calculateScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollbarWidth + 'px';
  }

  function resetScrollbars() {
    // need to perform on the next render cycle to allow the css transitions to take place
    setTimeout(() => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0';
    }, 200); // 500ms allows for any close animations to complete
  }

  function calculateScrollbarWidth() {
    // no scrollbars present
    if (document.body.clientHeight <= document.documentElement.clientHeight) {
      return 0;
    }

    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }

  if (opts.enable) {
    hideScrollbars()
  }

  return {
    update() {
      if (opts.enable) {
        hideScrollbars();
      } else {
        resetScrollbars();
      }
    },

    destroy() {
      resetScrollbars();
    }
  }
}
