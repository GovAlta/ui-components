import React, { FC, ReactElement, useState } from 'react'
import { GoAIcon, GoAScrollable } from '../../experimental'
import type { GoAIconType } from '../../experimental';
import './dropdown.scss'

export { GoADropdownOption } from './option'

const MAX_HEIGHT = 300;

interface Props {
  // required
  name: string;
  selectedValues: string[]
  onChange: (name: string, values: string[]) => void;

  // optional
  leadingIcon?: GoAIconType,
  multiSelect?: boolean;
  disabled?: boolean;
  maxHeight?: number;
}

export const GoADropdown: FC<Props> = ({ selectedValues = [], ...props }) => {
  const [isMenuVisible, _setMenuVisibility] = useState<boolean>(false)

  /**
   * Override the useState method to set the menu visibility to allow for conditional rendering
   */
  function setMenuVisibility(isVisible: boolean) {
    if (!props.disabled) {
      _setMenuVisibility(isVisible)
    }
  }

  /**
   * Binds the children with additional properties and events
   */
  function bindChildren() {
    return React.Children.map(props.children, (child: ReactElement) => {
      if (child.props.value) {
        return React.cloneElement(child, {
          ...child.props,
          onClick: handleSelection,
          selected: selectedValues.includes(child.props.value),
          _testId: `${props.name}-dropdown-option--${child.props.value}`
        })
      }
      return child;
    })
  }

  /**
   * Allows for conditional value relaying to the parent component and updates the selected labels
   */
  function handleSelection(value: string) {
    let values: string[];
    if (props.multiSelect) {
      if (selectedValues.includes(value)) {
        values = selectedValues.filter(v => v !== value);
      } else {
        values = [...selectedValues, value];
      }
    } else {
      values = [value];
    }
    props.onChange(props.name, values);
    toggleMenuVisibility();
  }

  /**
   * Controls whether the menu is hidden or not when clicked
   */
  function toggleMenuVisibility() {
    // always show if hidden
    if (!isMenuVisible) {
      setMenuVisibility(true)
    }
    // only hide if not multi select
    if (isMenuVisible && !props.multiSelect) {
      setMenuVisibility(false)
    }
  }

  /**
   * Generates a description of the selected options
   */
  function getSelectedLabel(): string {
    const selectedLabels =
      React.Children
        .map(props.children, (child: ReactElement) => child)
        .filter(child => selectedValues.includes(child.props.value))
        .map(child => child.props.label)

    if (props.multiSelect && selectedLabels.length > 1) {
      return `${selectedLabels.length} items selected`
    }

    if (selectedLabels.length === 1) {
      return selectedLabels[0];
    }

    return '';
  }

  return (
    <div className="goa-dropdown-box">
      {isMenuVisible &&
        <div data-testid={`${props.name}-dropdown-background`} className="goa-dropdown-background" onClick={() => setMenuVisibility(false)}></div>
      }
      <div
        onClick={toggleMenuVisibility}
        data-testid={`${props.name}-dropdown`}
        className={`goa-dropdown-input ${props.disabled && 'goa-dropdown-input--disabled' || ''}`} tabIndex={0} >
        {props.leadingIcon &&
          <div className="goa-dropdown-leading-icon">
            <GoAIcon size="small" type={props.leadingIcon} />
          </div>
        }
        <input readOnly placeholder="Select..." value={getSelectedLabel()} />
        <GoAIcon type="chevronDown" />
      </div>
      {isMenuVisible &&
        <ul className="goa-dropdown-list">
          <GoAScrollable vertical={true} height={props.maxHeight || MAX_HEIGHT}>
            {bindChildren()}
          </GoAScrollable>
        </ul>
      }
    </div>
  )
}
export default GoADropdown
