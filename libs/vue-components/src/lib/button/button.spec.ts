import { render, screen } from '@testing-library/vue';
import GoAButton from './button.vue';

describe('GoA Vue Button', () => {
  const buttonType = 'primary';
  const buttonClassName = 'goa-button';
  const buttonSecondaryClassName = 'goa--secondary';
  const buttonTertiaryClassName = 'goa--tertiary';
  const buttonSize = 'small';
  const buttonTitle = 'Test Title';
  const buttonNormalClassName = 'normal';
  const buttonTooltip = 'hovering';

  const noop = () => {/* noop */};

  test('should render the button title', () => {
    const { baseElement } = render(GoAButton, {
      props: { buttonType: buttonType, buttonSize: buttonSize, onClick: noop },
      slots: {
        default: buttonTitle
      },
    });

    expect(baseElement).toBeTruthy();
    expect(screen.getByText(buttonTitle))
  });

  test('buttonType=primary should render primary styling', () => {
    render(GoAButton, {
      props: { buttonType: buttonType, buttonSize: buttonSize, onClick: noop  },
      slots: {
        default: buttonTitle
      },
    });

    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonClassName);
    expect(button.className).not.toContain(buttonSecondaryClassName);
    expect(button.className).not.toContain(buttonTertiaryClassName);
  });

  test('buttonType=secondary should render secondary styling', () => {
    render(GoAButton, {
      props: { buttonType: 'secondary', buttonSize: buttonSize, onClick: noop  },
      slots: {
        default: buttonTitle
      },
    });

    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonClassName);
    expect(button.className).toContain(buttonSecondaryClassName);
    expect(button.className).not.toContain(buttonTertiaryClassName);
  });

  test('buttonType=tertiary should render tertiary styling', () => {
    render(GoAButton, {
      props: { buttonType: 'tertiary', buttonSize: buttonSize, onClick: noop  },
      slots: {
        default: buttonTitle
      },
    });

    const button = screen.getByRole('button');
    expect(button.className).toContain(buttonClassName);
    expect(button.className).not.toContain(buttonSecondaryClassName);
    expect(button.className).toContain(buttonTertiaryClassName);
  });

  test('buttonSize unset should render normal styling', () => {
    render(GoAButton, {
      props: { buttonType: buttonType, buttonSize: 'small', onClick: noop  },
      slots: {
        default: buttonTitle
      },
    });

    const button = screen.getByRole('button');
    expect(button.className).not.toContain(buttonNormalClassName);
  });

  test('tooltip is set to button title', () => {
    render(GoAButton, {
      props: { buttonType: 'tertiary', title: buttonTooltip, onClick: noop  },
      slots: {
        default: buttonTitle
      },
    });

    const button = screen.getByRole('button');
    expect(button.title).toContain(buttonTooltip);
  });
});
