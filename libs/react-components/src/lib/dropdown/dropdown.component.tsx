import classnames from 'classnames'

import React, {
  FC,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import {
  DropdownOption,
  DropdownContext,
} from './dropdown.context';
import './dropdown.component.scss';

import GoAOption from './option/option.component';
import GoAOptionGroup from './option-group/option-group.component';

type DropDownrops = {
  /**
  * Title of dropdown
  */
  title: string;
  /**
  * SubTitle of dropdown. The subtitle is normally used to indicate the state of dropdown.
  */
  subTitle?: string;
  /**
  * description of dropdown. Description is the message shown on the menu.
  */
  description?: string;
  /**
  * Custom description component
  */
  descriptionComponent?: ReactNode
  menuHeight?: number;
  /**
  * If true, allowe multiple selection. Otherwise, single selection is used as default.
  */
  multiple?: boolean;
  /**
  * If true, disable the dropdown.
  */
  disabled?: boolean;
  /**
  * Overwrite the discription when the dropdown is disabled.
  */
  display?: string;
  /**
  * Error messgae
  */
  errorMessage?: string;
  key?: string;
  /**
  * If true, the menu of the dropdown changes to input model. This is useful, if we need to add custom filter for the dropdown list.
  */
  menuEditable?: boolean;
  /**
  * Callback function if dropdown menu is in input model.
  */
  menuInputChanged?: (text: string) => void;
  /**
  * The property will overwrite the default toggle behavior.
  */
  open?: boolean
  /**
   * Callback function for option change event.
   */
  selectionChanged: (option: DropdownOption) => void;
}

export const GoADropdown: FC<DropDownrops> = ({
  title,
  subTitle,
  menuHeight,
  multiple,
  disabled,
  description,
  descriptionComponent,
  children,
  errorMessage,
  display,
  selectionChanged,
  key,
  open,
  menuEditable,
  menuInputChanged,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [maxMenuHeight, setMaxMenuHeight] = useState<number>(0);
  const menuRef = useRef<HTMLDivElement>();
  const overlayRef = useRef<HTMLDivElement>();

  const toggleOpen = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const rootDropDownCss = (): string => {
    return classnames({
      'goa-dropdown': true,
      'single-selection': !multiple,
      'has-error': errorMessage && errorMessage.length > 0,
    })
  }

  const dropDownGroupCss = (): string => {
    return classnames({
      'dropdown-grouping': true,
      'disabled': disabled,
    })
  }

  useEffect(() => {
    const height = menuHeight > 0
      ? menuHeight
      : overlayRef.current?.clientHeight - menuRef.current?.offsetTop - 20 || 0;
    setMaxMenuHeight(height);
  });

  const canOpen = (isOpenState: boolean, isOpenProp?: boolean,) => {
    // If open property is not provide, default menu toggle will be applied
    if (isOpenProp !== undefined) {
      return isOpenProp
    }

    return isOpenState
  }

  const canMenuEditable = (editableProp?: boolean) => {
    if (editableProp !== undefined) {
      return editableProp
    }
    return true
  }

  return (
    <DropdownContext.Provider value={{
      selectionChanged: selectionChanged
    }}>

      <div className="dropdown-overlay" data-testid='dropdown-container' ref={overlayRef} onClick={toggleOpen}></div>

      <div className={rootDropDownCss()} {...rest}>
        <label className="dropdown-label" htmlFor={`input-for-${title}`}>
          {title}
        </label>
        {subTitle &&
          <span className="required-label">{subTitle}</span>
        }
        <div className={dropDownGroupCss()} onClick={toggleOpen}>
          <i className="goa-select-icon"></i>
          {descriptionComponent ? <div className="dropdown-textbox"
          >{descriptionComponent}</div> : <input
            role="searchbox"
            className="dropdown-textbox margin-override"
            type="text"
            data-testid="menu-input"
            style={{ cursor: 'default' }}
            id={`input-for-${key}`}
            placeholder={display ? display : description}
            onChange={(e) => { menuInputChanged && menuInputChanged(e.target.value) }}
            readOnly={!canMenuEditable(menuEditable)}
          />}
          {canOpen(isOpen, open) &&
            <div className="dropdown-menu" data-testid='dropdown-menu'
              ref={menuRef} style={{
                position: 'absolute',
                zIndex: 1000,
                maxHeight: `${maxMenuHeight}px`,
                overflow: 'auto',
              }}>
              {children}
            </div>
          }
        </div>
        {!description &&
          <div>
            <span className="helper-text">{description}</span>
          </div>
        }
        {errorMessage &&
          <div>
            <span className="dropdown-label error-text">
              {errorMessage}
            </span>
          </div>
        }
      </div>
    </DropdownContext.Provider >
  );
};

GoADropdown.defaultProps = {
  disabled: false,
  description: null,
};

export default GoADropdown;
export { GoAOption, GoAOptionGroup }
