import React, { ReactNode, useState } from 'react';
import { GoAFormItem } from './container/form.item.component';
import { GoAFormButton } from './container/form.button.component';
import { GoAFormContainer } from './container/form.container.component';
import './form.scss';
import { emailValidator, requiredValidator } from './formFieldValidator';
import PropTypes from "prop-types";
import GoAButton from '../../lib/button/button';
import GoACallout from '../../lib/callout/callout';

type FormProps = {
  formTitle: string,
  formDescription: string,
  /**
   * Action to take on submit button click
   */
  onFormSubmit?: (data: object) => void;
  /**
   * Provide children to be rendered inside of the element
   */
  children?: ReactNode
}
interface formStateProps {
  data: {
    name?: string, value?: string
  },
  validators: { name?: string, validators?: [] },
  errors: { name?: string, errors?: [] }

}
const initState: formStateProps = {
  data: {
  },
  validators: {},
  errors: {}

};
let FormContext;
export const { Provider } = (FormContext = React.createContext<object>({}));

export const GoAForm = ({ formTitle = '', formDescription = '', onFormSubmit, children = null, ...props }: FormProps) => {
  const [formState, setFormState] = useState(initState);
  const [formErrors, setFormErrors] = useState([]);
  const onSubmit = e => {
    e.preventDefault();

    //check error array

    if (validate()) {
      const { errors } = formState;
      const errorNames = [];
      for (const key in errors) {

        if (errors[key].length > 0) {
          errorNames.push(key);
        }

      }

      onFormSubmit(formState.data);
    }

  };
  const validate = () => {
    const { validators } = formState;
    console.log("at beginner validators", validators);
    // always reset form errors
    // in case there was form errors from backend
    setFormState(state => ({
      ...state,
      errors: {}
    }));

    const formErrors = Object.entries(validators).reduce(
      (errors, [name, validators]) => {
        const { data } = formState;
        if (validators.length > 0) {
          const messages = validators.reduce((result, validator) => {
            const value = data[name];
            const err = validator(value, data);
            return [...result, ...err];
          }, []);

          if (messages.length > 0) {
            errors[name] = `${messages} ${name}`;
          }

          const errorNames = [];
          for (const key in errors) {

            if (errors[key].length > 0) {
              errorNames.push(key);
            }

          }
          setFormErrors(errorNames);
        }
        return errors;
      },
      {}
    );

    if (Object.keys(formErrors).length === 0) {
      return true;
    }

    setFormState(state => ({
      ...state,
      errors: formErrors
    }));

    return false;
  };


  const setFieldValue = (name, value) => {
    setFormState(state => {
      return {
        ...state,
        data: {
          ...state.data,
          [name]: value
        },
        errors: {
          ...state.errors,
          [name]: []
        }
      };
    });
  };
  const registerInput = ({ name, validators }) => {
    setFormState(state => {
      return {
        ...state,
        validators: {
          ...state.validators,
          [name]: validators || []
        },
        // clear any errors
        errors: {
          ...state.errors,
          [name]: []
        }
      };
    });

    // returning unregister method
    return () => {
      setFormState(state => {
        // copy state to avoid mutating it
        const { data, errors, validators: currentValidators } = { ...state };

        // clear field data, validations and errors
        delete data[name];
        delete errors[name];
        delete currentValidators[name];

        return {
          data,
          errors,
          validators: currentValidators
        };
      });
    };
  };

  const providerValue = {
    errors: formState.errors,
    data: formState.data,
    setFieldValue,
    registerInput
  };

  const renderErrorList = () => {
    return (
      <GoACallout
        type="emergency"
        title="Please fix following errors:"
      ><ul>
          {formErrors.map((error) => {
            return (
              <li><a href={`#${error}`} target="self">{error}</a></li>
            );
          })}

        </ul>
      </GoACallout>
    );
  }

  return (
    <Provider value={providerValue}>
      <div>
        <span className="goa-form-title">{formTitle}</span>
        <div className="goa-text">{formDescription}</div>
        {onFormSubmit ? (
          <form onSubmit={onSubmit} className="goa-form">
            {children}

            {formErrors.length > 0 && renderErrorList()}
            <GoAFormButton>
              <GoAButton buttonType="tertiary" type="button">
                Cancel
            </GoAButton>
              <GoAButton buttonType="primary" type="submit">
                Submit
            </GoAButton>
            </GoAFormButton>
          </form>
        ) : (
            children
          )}
      </div>
    </Provider>
  );
}
GoAForm.propTypes = {
  formTitle: PropTypes.string,
  formDescription: PropTypes.string,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
}
export default GoAForm;
export { GoAFormItem, GoAFormButton, GoAFormContainer };
export { FormContext };