import React from 'react';
import { render } from '@testing-library/react';
import { GoAForm, GoAFormItem } from './form.component';
import { screen } from '@testing-library/dom'
describe('GoA Form', () => {
  const formClassName = 'goa-form';
  const formItemClassName = 'goa-form-items';
  const formTitle = "Your Information";
  const formDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a ligula a ligulaxcrei kmlobortis lacinia non sed nibh."
  it('should render', () => {
    const { baseElement } = render(<GoAForm formTitle={formTitle}
      formDescription={formDescription}
    />);

    expect(baseElement).toBeTruthy();
    expect(screen.getByText(formTitle));
    expect(screen.getByText(formDescription));
    const container = document.querySelector('.goa-form');

    expect(container).not.toBeNull();
  });

  it('should render form item class', () => {
    render(<GoAForm formTitle={formTitle}
      formDescription={formDescription} >

      <GoAFormItem name="MiddleName" />
    </GoAForm >);
    const container = document.querySelector('.goa-form-items');

    expect(container).not.toBeNull();
  });

  it('should render goa form button class', () => {
    render(<GoAForm formTitle={formTitle}
      formDescription={formDescription} onFormSubmit={(data) => console.log(data)}  >

      <GoAFormItem name="MiddleName" />
    </GoAForm >);
    const container = document.querySelector('.goa-form-button');

    expect(container).not.toBeNull();
  });

});
