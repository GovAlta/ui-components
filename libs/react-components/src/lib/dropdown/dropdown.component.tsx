import React, { FC, useState, useEffect, Children, ChangeEvent, MouseEvent } from 'react';
import { KeyOptionPair, DropdownOption, DropdownContext } from './dropdown.context';
import './dropdown.component.scss';

interface Props {
  label: string;
  description?: string;
  required?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  typeAheadMode?: 'none' | 'startsWith' | 'contains';
  selectionChanged?: (selectedOptions: DropdownOption[]) => void;
}

export const GoADropdown: FC<Props> =
  ({ label, required, multiple, disabled, description, typeAheadMode, children, selectionChanged, ...rest }) => {
    const [options, setOptions] = useState<KeyOptionPair>({});
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectionDescription, setSelectionDescription] = useState<string>('');
    const [requiredError, setRequiredError] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('');

    //#region Helper functions

    // Indicates if there is any option selected
    const hasOptionSelected = () => {
      let hasSelection = false;
      Object.keys(options).forEach((key) => options[key].selected && (hasSelection = true));
      return hasSelection;
    }

    // Opens and closes the drop-down
    const toggleOpen = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    // Helper function that updates the description based on the selected options
    const refreshDescription = (allOptions) => {
      let selected: DropdownOption[] = [];
      Object.keys(allOptions).map(key => allOptions[key] && allOptions[key].selected && selected.push(allOptions[key]));

      if (selected.length === 0) {
        setSelectionDescription('');
      } else if (selected.length === 1) {
        setSelectionDescription(selected[0].description);
      } else {
        setSelectionDescription('(' + selected.length + ' options selected)');
      }
    }

    const filterMatchFunction = (value: string) => {
      let match: boolean = true;
      let safeFilter = (filter || '').toLowerCase();
      let safeValue = (value || '').toLowerCase();
      if (typeAheadMode !== 'none') {
        if (typeAheadMode === 'contains') {
          match = (safeValue.indexOf(safeFilter) >= 0);
        } else {
          match = (safeValue.startsWith(safeFilter));
        }
      }
      return match;
    }

    //#endregion

    //#region Evend handlers and callbacks

    const updateOptionHandler = (value: string, option: DropdownOption) => {
      if (!multiple) {
        if (option.selected) {
          // Unselect all other options
          Object.keys(options).map(key => { key !== option.value && (options[key].selected = false) })
          option.selected && setOptions({ ...options, [value]: option });
        }
        isOpen && toggleOpen();
      } else {
        setOptions({ ...options, [value]: option });
      }
    }

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setFilter(e.currentTarget.value);
      setSelectionDescription(e.currentTarget.value);

    };

    const inputClickhandler = (e: MouseEvent<HTMLInputElement>) => {
      (typeAheadMode !== "none" && isOpen) && e.stopPropagation();
    }

    //#endregion

    // Updates the description and invokes the selectionChanged callback function when the selection changes
    useEffect(() => {
      refreshDescription(options);

      if (selectionChanged) {
        const selectedOptions: DropdownOption[] = [];
        Object.keys(options).map((k) => options[k].selected && (selectedOptions.push(options[k])));
        selectionChanged(selectedOptions);
      }

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

      const registerChild = (child: any) => {
        if (child.props && child.props.id && child.props.label) {
          const option = new DropdownOption(child.props.id, child.props.label, child.props.defaultSelected);
          selectedOptions[child.props.id] = option;
        }
        if (child.props && child.props.children && child.props.children.length) {
          child.props.children.forEach(registerChild);
        }
      }

      Children.map(children,
        (child: any) => {
          if (child.type && child.type.displayName) {
            registerChild(child);
          }
        });
      setOptions(selectedOptions);
      setRequiredError(false);
    }, []);

    return (
      <DropdownContext.Provider value={{ options: options, updateOption: updateOptionHandler, filter: filter, matchesFilter: filterMatchFunction }}>
        <div
          className={`goa-dropdown ${!multiple ? 'single-selection' : ''} ${requiredError ? 'has-error' : ''}`}
          {...rest}
        >
          <label className="dropdown-label" htmlFor={`input-for-${label}`}>{label}</label>{required && <span className="required-label">(Required)</span>}
          <div className={`dropdown-grouping  ${disabled ? 'disabled' : ''}`} onClick={toggleOpen}>
            <i className="goa-select-icon"></i>
            <input className="dropdown-textbox margin-override" type="text" style={{ cursor: 'default' }} value={selectionDescription}
              id={`input-for-${label}`} placeholder={description} onChange={inputChangeHandler} readOnly={(!isOpen || typeAheadMode === 'none')}></input>
            {isOpen && (
              <div className="dropdown-menu" style={{ position: 'absolute', zIndex: 1000, maxHeight: '300px', overflow: 'auto' }}>
                {children}
              </div>
            )}
          </div>
          {!requiredError && <span className="helper-text">{description}</span>}
          {requiredError && <span className="dropdown-label error-text">At least one item must be selected.</span>}
        </div >
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
