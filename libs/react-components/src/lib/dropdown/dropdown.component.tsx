import classnames from 'classnames'

import React, {
  FC,
  useState,
  useEffect,
  Children,
  ChangeEvent,
  useRef,
  ReactElement,
} from 'react';
import {
  KeyOptionPair,
  DropdownOption,
  DropdownContext,
} from './dropdown.context';
import './dropdown.component.scss';

import GoAOption from './option/option.component';

interface Props {
  label: string;
  description?: string;
  required?: boolean;
  menuHeight?: number;
  multiple?: boolean;
  disabled?: boolean;
  typeAheadMode?: 'none' | 'startsWith' | 'contains';
  value?: string;
  values?: string[],
  selectionChanged: (selectedOptions: DropdownOption[]) => void;
}

export const GoADropdown: FC<Props> = ({
  label,
  required,
  menuHeight,
  multiple,
  disabled,
  description,
  typeAheadMode,
  children,
  value,
  values,
  selectionChanged,
  ...rest
}) => {
  const [options, setOptions] = useState<KeyOptionPair>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectionDescription, setSelectionDescription] = useState<string>('');
  const [requiredError, setRequiredError] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');
  const [maxMenuHeight, setMaxMenuHeight] = useState<number>(0);

  const menuRef = useRef<HTMLDivElement>();
  const overlayRef = useRef<HTMLDivElement>();

  // Indicates if there is any option selected
  const hasOptionSelected = () => {
    let hasSelection = false;
    Object.keys(options).forEach(
      (key) => options[key].selected && (hasSelection = true)
    );
    return hasSelection;
  };

  // Opens and closes the drop-down
  const toggleOpen = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // Helper function that updates the description based on the selected options
  const refreshDescription = (allOptions: KeyOptionPair) => {
    const selectedOptions =
      Object.values(allOptions).filter(option => {
        return option?.selected;
      });

    const description = selectedOptions.length > 0
      ? selectedOptions.map(item => item.description).join(', ')
      : ''
    setSelectionDescription(description);
  };

  const filterMatchFunction = (filter = '', value = ''): boolean => {
    const safeFilter = filter.toLowerCase();
    const safeValue = value.toLowerCase();

    if (filter === '') {
      return true;
    }

    switch (typeAheadMode) {
      case 'contains':
        return safeValue.indexOf(safeFilter) >= 0;
      case 'startsWith':
        return safeValue.startsWith(safeFilter);
      case 'none':
        return true;
    }
  };

  const updateOptionHandler = (value: string, option: DropdownOption) => {
    if (isMultiple()) {
      setOptions({ ...options, [value]: option });
    } else {
      // Unselect all other options
      Object.entries(options).forEach(([key, item]) => {
        if (key !== option.value) {
          item.selected = false;
        }
      });
      setOptions({ ...options, [value]: option });

      if (isOpen) {
        toggleOpen()
      }
    }
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value);
    setSelectionDescription(e.currentTarget.value);
  };

  const rootDropDownCss = (): string => {
    return classnames({
      'goa-dropdown': true,
      'single-selection': !multiple,
      'has-error': requiredError,
    })
  }

  const dropDownGroupCss = (): string => {
    return classnames({
      'dropdown-grouping': true,
      'disabled': disabled,
    })
  }

  // Ensures that when the values property is used that the component overrides a default false value
  function isMultiple(): boolean {
    return multiple || (typeof values === 'object');
  }

  // Updates the description and invokes the selectionChanged callback function when the selection changes
  useEffect(() => {
    refreshDescription(options);

    const selectedOptions = Object.values(options).filter(option => option.selected);
    selectionChanged(selectedOptions);
  }, [options]);

  // Updates the required-error status when the drop-down is closed
  useEffect(() => {
    if (!isOpen && required) {
      setRequiredError(!hasOptionSelected());
    } else {
      setRequiredError(false);
    }
    setFilter('');
    refreshDescription(options);
  }, [isOpen]);

  // Initializes the 'options' state based on the children
  useEffect(() => {
    // Initialize the children
    const selectedOptions: KeyOptionPair = {};

    const registerChild = (child: ReactElement) => {
      const props = child.props;
      if (!props) {
        return;
      }
      if (props.value && props.label) {
        const isSelected =
          value === props.value
          || values?.includes(props.value)
          || props.defaultSelected;

        const option = new DropdownOption(
          props.value,
          props.label,
          isSelected
        );
        selectedOptions[props.value] = option;
      }
      if (Array.isArray(props.children)) {
        props.children.forEach(registerChild);
      }
    };


    Children.map(children, (child: ReactElement) => {
      registerChild(child);
    });
    setOptions(selectedOptions);
    setRequiredError(false);
  }, []);

  useEffect(() => {
    const height = menuHeight > 0
      ? menuHeight
      : overlayRef.current?.clientHeight - menuRef.current?.offsetTop - 20 || 0;

    setMaxMenuHeight(height);
  });

  return (
    <DropdownContext.Provider value={{
      options: options,
      updateOption: updateOptionHandler,
      filter: filter,
      matchesFilter: filterMatchFunction,
    }}>
      {isOpen &&
        <div className="dropdown-overlay" ref={overlayRef} onClick={toggleOpen}></div>
      }

      <div className={rootDropDownCss()} {...rest}>
        <label className="dropdown-label" htmlFor={`input-for-${label}`}>
          {label}
        </label>
        {required &&
          <span className="required-label">(Required)</span>
        }
        <div className={dropDownGroupCss()} onClick={toggleOpen}>
          <i className="goa-select-icon"></i>
          <input
            role="searchbox"
            className="dropdown-textbox margin-override"
            type="text"
            style={{ cursor: 'default' }}
            value={selectionDescription}
            id={`input-for-${label}`}
            placeholder={description}
            onChange={inputChangeHandler}
            readOnly={!isOpen || typeAheadMode === 'none' || isMultiple()}
          />
          {isOpen &&
            <div className="dropdown-menu" ref={menuRef} style={{
              position: 'absolute',
              zIndex: 1000,
              maxHeight: `${maxMenuHeight}px`,
              overflow: 'auto',
            }}>
              {children}
            </div>
          }
        </div>
        {!requiredError &&
          <span className="helper-text">{description}</span>
        }
        {requiredError &&
          <span className="dropdown-label error-text">
            At least one item must be selected.
          </span>
        }
      </div>
    </DropdownContext.Provider>
  );
};

GoADropdown.defaultProps = {
  required: false,
  multiple: false,
  disabled: false,
  description: null,
  typeAheadMode: 'none',
};

export default GoADropdown;
export { GoAOption }
