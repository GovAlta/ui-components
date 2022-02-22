import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/vue';
import GoACheckbox from './checkbox.vue';

describe('GoA Checkbox', () => {
  it("dummy test", async () => {
    expect(true).toBe(true)
  })

//   const label = 'label test';

//   it('should render label', () => {
//     render(GoACheckbox, {
//       props: { content: label },
//     });

//     expect(screen.getByText(label)).not.toBeNull();
//   });

//   test('should render label', () => {
//     render(GoACheckbox, {
//       props: { content: label },
//     });

//     expect(screen.getByText(label)).not.toBeNull();
//   });

//   test('should render checkmark svg when checked', () => {
//     render(GoACheckbox, {
//       props: { content: label, checked: true },
//     });

//     userEvent.click(screen.getByText(label));

//     const checkmark = document.getElementById('checkmark');
//     const dashmark = document.getElementById('dashmark');

//     expect(checkmark).not.toBeNull();
//     expect(dashmark).toBeNull();
//   });

//   describe('Indeterminate', () => {
//     test('should not render dash svg when checked is true', () => {
//       render(GoACheckbox, {
//         props: { content: label, checked: true, indeterminate: true },
//       });

//       const checkmark = document.getElementById('checkmark');
//       const dashmark = document.getElementById('dashmark');

//       expect(dashmark).toBeNull();
//       expect(checkmark).not.toBeNull();
//     });

//     test('should render dash svg when checked is false', () => {
//       render(GoACheckbox, {
//         props: { content: label, checked: false, indeterminate: true },
//       });

//       const checkmark = document.getElementById('checkmark');
//       const dashmark = document.getElementById('dashmark');

//       expect(dashmark).not.toBeNull();
//       expect(checkmark).toBeNull();
//     });
//   });

//   test('required should display red border on checkbox when checked is false', () => {
//     render(GoACheckbox, {
//       props: { content: label, checked: false, required: true },
//     });

//     const container = document.querySelector('.goa-checkbox');

//     expect(container).not.toBeNull();
//     expect(container.classList).toContain('has-error');
//   });

//   test('required should NOT display red border on checkbox when checked is true', () => {
//     render(GoACheckbox, {
//       props: { content: label, checked: true, required: true },
//     });

//     const container = document.querySelector('.goa-checkbox');

//     expect(container).not.toBeNull();
//     expect(container.classList).not.toContain('has-error');
//   });
});
