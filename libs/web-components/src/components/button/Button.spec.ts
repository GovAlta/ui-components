import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/svelte';
import GoAButton from './Button.svelte'

describe('GoAButtonComponent', () => {
  const buttonText = 'Test Title';
  const buttonPrimaryClassName = 'primary';
  const buttonSecondaryClassName = 'secondary';
  const buttonTertiaryClassName = 'tertiary';
  const buttonSmallClassName = 'small';
  const buttonTitle = 'hovering';

  it('should render - success', async () => {
    const baseElement = render(GoAButton, { disabled:"false", title: buttonText });
    const button = await baseElement.findByRole('button');

    expect(button).toBeTruthy();
    expect(button).toContainHTML(buttonText)
  });

  test('events should work', async () => {
    const onClick = jest.fn();
    const results = render(GoAButton);

    results.component.$on('click', onClick);

    const button = results.container.querySelector('button');
    expect(button).not.toBeNull();

    await fireEvent.click(button as HTMLElement);

    expect(results.container).toBeInTheDocument();
    expect(onClick.mock.calls).not.toBeNull();
  });

  it('type=should render primary styling', async () => {
    const baseElement = render(GoAButton, { type:"primary", disabled:"false", title: buttonText });
    const button = await baseElement.findByRole("button");

    expect(button).toBeTruthy();

    expect(button.className).toContain(buttonPrimaryClassName);
    expect(button.className).not.toContain(buttonSecondaryClassName);
    expect(button.className).not.toContain(buttonTertiaryClassName);
  });

  it('type=should render secondary styling', async () => {
    const baseElement = render(GoAButton, { type:"secondary", disabled:"false", title: buttonText });
    const button = await baseElement.findByRole("button");

    expect(button).toBeTruthy();

    expect(button.className).not.toContain(buttonPrimaryClassName);
    expect(button.className).toContain(buttonSecondaryClassName);
    expect(button.className).not.toContain(buttonTertiaryClassName);
  });

  it('type=should render tertiary styling', async () => {
    const baseElement = render(GoAButton, { type:"tertiary", disabled:"false", title: buttonText });
    const button = await baseElement.findByRole("button");

    expect(button).toBeTruthy();

    expect(button.className).not.toContain(buttonPrimaryClassName);
    expect(button.className).not.toContain(buttonSecondaryClassName);
    expect(button.className).toContain(buttonTertiaryClassName);
  });

  test('size=small should render small styling', async () => {
    const baseElement = render(GoAButton, { type:"tertiary", disabled:"false", title: buttonText, size:'small' });
    const button = await baseElement.findByRole("button");

    expect(button).toBeTruthy();

    expect(button.className).toContain(buttonSmallClassName);
  });

  test('title is set to button title', async () => {
    const baseElement = render(GoAButton, { type:"tertiary", disabled:"false", title:buttonTitle });
    const button = await baseElement.findByRole("button");

    expect(button).toBeTruthy();

    expect(button.title).toContain(buttonTitle);
  });
});
