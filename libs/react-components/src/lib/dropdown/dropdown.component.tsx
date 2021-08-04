import classnames from 'classnames'

import React, {
  FC,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  DropdownOption,
  DropdownContext,
} from './dropdown.context';
import './dropdown.component.scss';

import GoAOption from './option/option.component';
import GoAOptionGroup from './option-group/option-group.component';

interface Props {
  title: string;
  subTitle: string;
  description?: string;
  menuHeight?: number;
  multiple?: boolean;
  disabled?: boolean;
  display?: string;
  errorMessage?: string;
  key?: string;
  selectionChanged: (option: DropdownOption) => void;
}

export const GoADropdown: FC<Props> = ({
  title,
  subTitle,
  menuHeight,
  multiple,
  disabled,
  description,
  children,
  errorMessage,
  display,
  selectionChanged,
  key,
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

  return (
    <DropdownContext.Provider value={{
      selectionChanged: selectionChanged
    }}>
      {isOpen &&
        <div className="dropdown-overlay" ref={overlayRef} onClick={toggleOpen}></div>
      }

      <div className={rootDropDownCss()} {...rest}>
        <label className="dropdown-label" htmlFor={`input-for-${title}`}>
          {title}
        </label>
        {subTitle &&
          <span className="required-label">{subTitle}</span>
        }
        <div className={dropDownGroupCss()} onClick={toggleOpen}>
          <i className="goa-select-icon"></i>
          <input
            role="searchbox"
            className="dropdown-textbox margin-override"
            type="text"
            style={{ cursor: 'default' }}
            id={`input-for-${key}`}
            placeholder={display ? display : description}
            readOnly={!isOpen}
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
