import { render, screen } from '@testing-library/vue';
import GoAButton from './button.vue';
import userEvent from '@testing-library/user-event';
import {ServiceLevel} from "./service-level.enum";

describe('GoA Microsite Logo', () => {
  const buttonType = 'primary';
  const buttonClassName = 'goa-button';
  const buttonSecondaryClassName = 'goa--secondary';
  const buttonTertiaryClassName = 'goa--tertiary';
  const buttonSize = 'normal';
  const buttonTitle = 'Test Title';
  const buttonNormalClassName = 'normal';
  const buttonTooltip = 'hovering';

  test('should render the button title', async () => {
    const { baseElement } = await render(GoAButton, {
      props: { buttonType: buttonType, buttonSize: buttonSize, content: buttonTitle }
    });

    expect(baseElement).toBeTruthy();
    expect(screen.getByText(buttonTitle))
  });

  test('buttonType=primary should render primary styling', async () => {
    await render(GoAButton, {
      props: { buttonType: buttonType, buttonSize: buttonSize, content: buttonTitle }
    });

    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonClassName);
    expect(button.className).not.toContain(buttonSecondaryClassName);
    expect(button.className).not.toContain(buttonTertiaryClassName);
  });

  test('buttonType=secondary should render secondary styling', async () => {
    await render(GoAButton, {
      props: { buttonType: 'secondary', buttonSize: buttonSize, content: buttonTitle }
    });

    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonClassName);
    expect(button.className).toContain(buttonSecondaryClassName);
    expect(button.className).not.toContain(buttonTertiaryClassName);
  });

  test('buttonType=tertiary should render tertiary styling', async () => {
    await render(GoAButton, {
      props: { buttonType: 'tertiary', buttonSize: buttonSize, content: buttonTitle }
    });

    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonClassName);
    expect(button.className).not.toContain(buttonSecondaryClassName);
    expect(button.className).toContain(buttonTertiaryClassName);
  });

  test('buttonSize unset should render normal styling', async () => {
    await render(GoAButton, {
      props: { buttonType: buttonType, buttonSize: 'small', content: buttonTitle }
    });

    const button = screen.getByRole('button');
    expect(button.className).not.toContain(buttonNormalClassName);
  });

  test('tooltip is set to button title', async () => {
    await render(GoAButton, {
      props: { buttonType: 'tertiary', content: buttonTitle, tooltip: buttonTooltip }
    });

    const button = screen.getByRole('button');
    expect(button.title).toContain(buttonTooltip);
  });

  test('responds to events', async () => {
    const onClickStub = jest.fn()
    await render(GoAButton, {
      props: { buttonType: 'tertiary', content: buttonTitle, tooltip: buttonTooltip, onClick: onClickStub, datatestid: "goaButton" }
    });
    const button = screen.getByRole('button');
    userEvent.click(button)
    expect(onClickStub).toHaveBeenCalled
  });
});
