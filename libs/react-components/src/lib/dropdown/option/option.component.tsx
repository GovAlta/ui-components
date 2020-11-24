import React, { FC, useState, useContext } from 'react';
import { DropdownContext, DropdownOption } from '../dropdown.context';

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

  const context = useContext(DropdownContext);

  const toggleSelected = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    context.updateOption(id, new DropdownOption(id, label, context.options[id] ? !context.options[id].selected : true));
  };

  return (
    <DropdownContext.Consumer>
      {
        ({ options, filter, matchesFilter }) => ((!filter || matchesFilter(label)) &&
          (
            <div className={`option ${options[id] && options[id].selected ? 'selected' : ''} ${isActive}`} onClick={toggleSelected}
              onMouseEnter={() => { setActive('active'); }}
              onMouseLeave={() => { setActive(''); }}
            >
              <div className="goa-option">
                {children || label}
              </div>
            </div>
          )
        )
      }
    </DropdownContext.Consumer>
  );
};

GoAOption.defaultProps = {
  defaultSelected: false
}

export default GoAOption;
