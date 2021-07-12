// import React from 'react';
// import { render } from '@testing-library/react';
// import { GoAForm, GoAFormButton, GoAFormItem } from './form.component';
// import { screen } from '@testing-library/dom'
// import { GoAButton } from '../../lib/button/button';
// describe('GoA Form', () => {
//   const formClassName = 'goa-form';
//   it('should render', () => {
//     const { baseElement } = render(<GoAForm />);

//     expect(baseElement).toBeTruthy();

//   });

//   it('should render form class', () => {
//     render(<GoAForm data-testid="goaForm" >
//       <GoAFormItem>
//         <label>FirstName</label>
//         <input
//           name="FirstName"
//           type="text"
//           required={true}
//         />
//       </GoAFormItem></GoAForm >);
//     const form = screen.getByTestId('goaForm');

//     expect(form.className).toContain(formClassName);
//   });
// });
