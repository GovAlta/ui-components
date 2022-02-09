import React, { FC } from 'react';
import './Note.css';

type NoteType = 'caution' | 'dont' | 'best-practices';

interface Props {
  type: NoteType;
}

function getTitle(type: NoteType) {
  switch (type) {
    case 'caution':
      return 'Caution';
    case 'dont':
      return 'Don\'t';
    case 'best-practices':
      return 'Best Practices';
  }
}

export const Note: FC<Props> = (props) => {
  return (
    <div className={ `note note-${props.type}` }>
      <h4 className="note-title">
        { getTitle(props.type) }
      </h4>

      <div className="note-content">
        {props.children}
      </div>
    </div>
  );
}
