import React from 'react';
import { render } from '@testing-library/react';
import { GoAForm, GoAFormActions, GoAFormItem } from './form.component';
import GoAButton from '../../lib/button/button';
describe('GoA Form', () => {
  it('should render', () => {
    const { baseElement } = render(
      <GoAForm />
    );
    expect(baseElement).toBeTruthy();
    const container = document.querySelector('.goa-form');
    expect(container).not.toBeNull();
  });

  it('should render form item class', () => {
    render(
      <GoAForm>
        <GoAFormItem helpText="Non-standard Input">
          <label>Middle Name</label>
          <input type="input" name="middleName" />
        </GoAFormItem>
      </GoAForm>
    );
    let container = document.querySelector('.goa-form-item');
    expect(container).not.toBeNull();
    container = document.querySelector('.help-msg ');
    expect(container).not.toBeNull();
  });

  it('should render goa form button class', () => {
    render(
      <GoAForm>
        <GoAFormItem />
        <GoAFormActions>
          <GoAButton buttonType="tertiary" type="reset">
            Cancel
        </GoAButton>
          <GoAButton buttonType="primary" type="submit">
            Submit
              </GoAButton>
        </GoAFormActions>
      </GoAForm>
    );
    const container = document.querySelector('.goa-form-actions');

    expect(container).not.toBeNull();
  });
});
