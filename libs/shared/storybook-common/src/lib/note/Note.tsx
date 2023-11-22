import { ReactNode } from "react";
import "./Note.css";

type NoteType = "caution" | "do" | "dont" | "best-practices";

interface Props {
  type: NoteType;
  children: ReactNode;
}

function getTitle(type: NoteType) {
  switch (type) {
    case "caution":
      return "Caution";
    case "do":
      return "Do";
    case "dont":
      return "Don't";
    case "best-practices":
      return "Best Practices";
  }
}

export function Note(props: Props): JSX.Element {
  return (
    <div className={`note note-${props.type}`}>
      <h3 className="note-title">{getTitle(props.type)}</h3>

      <div className="note-content">{props.children}</div>
    </div>
  );
};
