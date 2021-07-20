import React, { FC, useState, useEffect, Children } from 'react';
interface Props {
  label: string;
}

export const GoAOptionGroup: FC<Props> = ({ label, children }) => {
  const [itemLabels, setItemLabels] = useState<string[]>([]);

  // Load the itemLabes state variable
  useEffect(() => {
    const allLabels = [];
    Children.forEach(children, (child: any) => {
      if (child.props?.value && child.props?.label) {
        allLabels.push(child.props.label);
      }
    })
    setItemLabels(allLabels);
  }, []);

  return (
    <div className='option-group'>
      <div className='option-group-label'>{label}</div>
      {children}
    </div>
  );
}

export default GoAOptionGroup;
