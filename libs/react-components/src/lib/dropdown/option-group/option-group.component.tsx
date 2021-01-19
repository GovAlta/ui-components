import React, { FC, useState, useEffect, Children, useContext } from 'react';
import { DropdownContext } from '../dropdown.context';

interface Props {
  label: string;
}

export const GoAOptionGroup: FC<Props> = ({ label, children }) => {
  const [itemLabels, setItemLabels] = useState<string[]>([]);
  const { filter, matchesFilter } = useContext(DropdownContext)

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
    (!filter || itemLabels.some(matchesFilter)) &&
      <div className='option-group'>
        <div className='option-group-label'>{label}</div>
        {children}
      </div>
  );
}

export default GoAOptionGroup;
