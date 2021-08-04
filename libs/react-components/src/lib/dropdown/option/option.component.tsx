import React, { FC, useState, useContext } from 'react';
import classnames from 'classnames'
import { DropdownContext } from '../dropdown.context';

export interface GoAOptionProps {
  label: string;
  value: string;
  selected?: boolean;
  defaultSelected?: boolean;
  children?
}

export const GoAOption: FC<GoAOptionProps> = (props: GoAOptionProps) => {
  const { label, children, selected } = props;
  const [isActive, setActive] = useState<string>('');
  const { selectionChanged } = useContext(DropdownContext);

  function onClick(e: { stopPropagation: () => void; }) {
    e.stopPropagation();
    // Flip the props, since user click it
    const selected = !props.selected

    if (selectionChanged) {
      selectionChanged({ ...props, selected })
    }
  }

  function rootCss() {
    return classnames({
      option: true,
      selected: selected,
      active: isActive
    })
  }

  return (
    <div
      role="listitem"
      className={rootCss()}
      onClick={onClick}
      onMouseEnter={() => { setActive('active'); }}
      onMouseLeave={() => { setActive(''); }}
    >
      <div className="goa-option">
        {children || label}
      </div>
    </div>
  );
};

GoAOption.defaultProps = {
  defaultSelected: false
}

export default GoAOption;
