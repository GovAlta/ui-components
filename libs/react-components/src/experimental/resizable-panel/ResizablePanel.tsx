import { ReactNode, useEffect, useRef, useState, type JSX } from "react";
import Css from "./ResizablePanel.module.css";
import { GoabIcon } from "../../lib/icon/icon";

export type ResizableProps = {
  minWidth?: number;
  children: ReactNode;
};

type MouseState = "static" | "active";

export function ResizablePanel(props: ResizableProps): JSX.Element {
  // element refs
  const bgRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const widthRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);

  // value refs
  const maxWidth = useRef<number>(0);
  const resizeBarState = useRef<MouseState>("static");

  // state
  const [width, setWidth] = useState<string>();

  useEffect(() => {
    maxWidth.current = bgRef.current?.getBoundingClientRect().width ?? 0;
  }, []);

  function resetMouseState() {
    resizeBarState.current = "static";
  }

  function onMouseDown(_: React.MouseEvent) {
    resizeBarState.current = "active";
    window.addEventListener("mouseup", resetMouseState);
  }

  function onMouseUp(_: React.MouseEvent) {
    resizeBarState.current = "static";
    window.removeEventListener("mouseup", resetMouseState);
  }

  function onMouseMove(e: React.MouseEvent) {
    if (resizeBarState.current === "static") {
      return;
    }

    const sectionEl = sectionRef.current;
    const xOffset = sectionEl?.getBoundingClientRect().x || 0;
    const mouseX = e.clientX;
    const minWidth = props.minWidth || 0;

    if (mouseX <= 0) {
      return;
    }

    // mouse direction
    const newXPos = handleRef.current?.getBoundingClientRect().x ?? 0;

    // set width of preview area
    const calcWidth = Math.max(
      newXPos - xOffset,
      Math.min(mouseX - xOffset, maxWidth.current),
    );
    const elementWidth = Math.max(minWidth, calcWidth - 64); // 4rem padding

    // prevent dragging bar more than allowed
    if (elementWidth <= minWidth) {
      return;
    }

    // set resizable area width
    sectionEl?.setAttribute("style", `width: ${calcWidth}px;`);
    // set displayed px width
    widthRef.current?.setAttribute(
      "style",
      `right: ${maxWidth.current - calcWidth + 32}px`,
    );
    setWidth(`${Math.round(elementWidth)}px`);
  }

  return (
    <div
      ref={bgRef}
      className={Css.panelBackground}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <section ref={sectionRef} className={Css.panel}>
        <div className={Css.children}>{props.children}</div>
        <div ref={handleRef} className={Css.handle}>
          <GoabIcon type="reorder-two" />
        </div>
      </section>
      <div ref={widthRef} className={Css.width}>
        {width}
      </div>
    </div>
  );
}

export default ResizablePanel;
