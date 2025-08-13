import React from "react";

interface CheckboxContextProps {
  inCheckboxList: boolean;
}

export const CheckboxContext = React.createContext<CheckboxContextProps>({
  inCheckboxList: false,
});
