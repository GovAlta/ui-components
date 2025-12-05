// Public helper function to dispatch messages
export function dispatch<T>(
  el: HTMLElement | Element | null | undefined,
  eventName: string,
  detail?: T,
  opts?: { bubbles?: boolean; cancelable?: boolean; timeout?: number },
) {
  const dispatch = () => {
    try {
      el?.dispatchEvent?.(
        new CustomEvent<T>(eventName, {
          composed: true,
          bubbles: opts?.bubbles,
          cancelable: opts?.cancelable,
          detail,
        }),
      );
    } catch (e) {
      console.error("dispatch() error:", e);
    }
  };

  if (opts?.timeout) {
    setTimeout(dispatch, opts.timeout);
  } else {
    dispatch();
  }
}

export function relay<T>(
  el: HTMLElement | Element | null | undefined,
  eventName: string,
  data?: T,
  opts?: { bubbles?: boolean; cancelable?: boolean; timeout?: number },
) {
  if (!el) {
    console.warn("relay() el is null | undefined");
    return;
  }

  const dispatch = () => {
    try {
      el?.dispatchEvent?.(
        new CustomEvent<{ action: string; data?: T }>("msg", {
          composed: true,
          bubbles: opts?.bubbles,
          cancelable: opts?.cancelable,
          detail: {
            action: eventName,
            data,
          },
        }),
      );
    } catch (e) {
      console.error("relay() error:", e);
    }
  };

  if (opts?.timeout) {
    setTimeout(dispatch, opts.timeout);
  } else {
    dispatch();
  }
}
