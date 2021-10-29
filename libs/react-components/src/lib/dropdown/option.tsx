import React, { FC } from 'react'
import './dropdown.scss'

interface Props {
  // Required
  value: string;
  label: string;

  // Optional
  selected?: boolean;
  disabled?: boolean;
  onClick?: (value: string) => void;
  visible?: boolean;

  // Set by the parent
  _testId?: string;
}

export const GoADropdownOption: FC<Props> = (props) => {
  const onClick = () => {
    if (!props.disabled) {
      props.onClick(props.value)
    }
  }

  return (
    <li
      key={props.value}
      style={{ display: props.visible ? 'block' : 'none' }}
      className={`
        goa-dropdown-option
        ${props.disabled ? 'goa-dropdown-option--disabled' : ''}
        ${props.selected ? 'goa-dropdown-option--selected' : ''}
      `}
      data-testid={props._testId}
      onClick={onClick}>
      {props.children || props.label}
    </li>
  )
}
