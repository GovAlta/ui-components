import React, { Children, useContext, useState } from 'react';
import { Props as RadioProps } from './radio/radio';

export const RadioContext = React.createContext<{ selectedValue: string }>({
  selectedValue: '',
});

export const RadioGroupContext = (initialValue, required, children) => {
  const [selectedValue, setSelectedValue] = useState<string>(initialValue);

  function hasError(): boolean {
    if (!required) {
      return false;
    }

    let hasCheckedItem = false;
    Children.forEach(children, (child: any) => {
      const childProps = child.props as RadioProps;
      if (childProps.value === selectedValue) {
        hasCheckedItem = true;
      }
    });

    return !hasCheckedItem;
  }

  return (
    <RadioContext.Provider value={{ selectedValue }}>
      {children}
    </RadioContext.Provider>
  );
};

export default RadioGroupContext;
