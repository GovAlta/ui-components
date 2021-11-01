import React, { FC, ReactElement, useState } from 'react'
import { GoAInput, GoAScrollable } from '../../experimental'
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
  disabled?: boolean;
  autoComplete?: boolean;
  leadingIcon?: GoAIconType,
  maxHeight?: number;
  multiSelect?: boolean;
  placeholder?: string;
}

export const GoADropdown: FC<Props> = ({ selectedValues = [], ...props }) => {
  const [isMenuVisible, _setMenuVisibility] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>('');

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
  function getChildren() {
    const _filter = filter.toLowerCase();
    return React.Children
      .map(props.children, (child: ReactElement) => {
        if (child.props.value) {
          const visible = !_filter
            || child.props.value.toLowerCase().includes(_filter)
            || child.props.label.toLowerCase().includes(_filter);

          return React.cloneElement(child, {
            ...child.props,
            visible: visible,
            onClick: handleSelection,
            selected: selectedValues.includes(child.props.value),
            _testId: `${props.name}-dropdown-option--${child.props.value}`
          })
        }

        if (filter) {
          return
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
      values = selectedValues.includes(value) ? [] : [value];
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
      setFilter('');
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
      <div>
        {(!isMenuVisible || !props.autoComplete) &&
          <div
            onClick={toggleMenuVisibility}
            data-testid={`${props.name}-dropdown`}>
            <GoAInput
              type="text"
              disabled={props.disabled}
              trailingIcon="chevron-down"
              leadingIcon={props.leadingIcon}
              name="search"
              readonly={true}
              onChange={null}
              placeholder={props.placeholder}
              value={getSelectedLabel()} />
          </div>
        }
        {isMenuVisible &&
          <>
            {props.autoComplete &&
              <GoAInput
                type="text"
                placeholder="Filter"
                focused={isMenuVisible}
                variant="goa"
                name="filter"
                value={filter}
                trailingIcon={filter.length > 0 ? 'close-circle' : 'search'}
                onTrailingIconClick={() => filter.length > 0 && setFilter('')}
                onChange={(_name, value) => setFilter(value)} />
            }
            <ul className="goa-dropdown-list">
              <GoAScrollable vertical={true} height={props.maxHeight || MAX_HEIGHT}>
                {getChildren()}
              </GoAScrollable>
            </ul>
          </>
        }
      </div>
    </div>
  )
}
export default GoADropdown
