import React, { FC, useState, useEffect, Children } from 'react';
import { DropdownContext } from '../dropdown.context';

interface Props {
  label: string;
}

export const GoAOptionGroup: FC<Props> = ({ label, children }) => {
  const [itemLabels, setItemLabels] = useState<string[]>([]);

  // Load the itemLabes state variable
  useEffect(() => {
    let allLabels = [];
    Children.forEach(children, (child: any) => {
      if (child && child.props && child.props.id && child.props.label) {
        allLabels.push(child.props.label);
      }
    })
    setItemLabels(allLabels);
  }, []);

  return (
    <DropdownContext.Consumer>
      {
        ({ filter, matchesFilter }) =>
         (
          (!filter || itemLabels.some(matchesFilter)) &&
          (
            <div className='option-group'>
              <div className='option-group-label'>{label}</div>
              {children}
            </div>
            )
        )
      }
    </DropdownContext.Consumer>
  );

}

export default GoAOptionGroup;
