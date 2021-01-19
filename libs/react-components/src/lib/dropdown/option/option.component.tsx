import React, { FC, useState, useContext } from 'react';
import { DropdownContext, DropdownOption } from '../dropdown.context';
import classnames from 'classnames'

interface Props {
  /** value The unique identifier of the element */
  id: string;
  /** The description of the option */
  label: string;
  /** Indicates if the element is selected by default */
  defaultSelected?: boolean;
}

export const GoAOption: FC<Props> = ({ id, label, children }) => {
  const [isActive, setActive] = useState<string>('');
  const { filter, matchesFilter, options, updateOption } = useContext(DropdownContext);

  function toggleSelected(e: { stopPropagation: () => void; }) {
    e.stopPropagation();
    updateOption(id, new DropdownOption(id, label, options[id] ? !options[id].selected : true));
  }

  function rootCss() {
    return classnames({
      option: true,
      selected: options[id] && options[id].selected,
      isActive
    })
  }

  return (
    (!filter || matchesFilter(label)) &&
    <div className={rootCss()}
      onClick={toggleSelected}
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
