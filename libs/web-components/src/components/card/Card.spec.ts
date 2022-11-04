import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import GoACard from './Card.svelte'

describe('GoACardComponent', () => {

  it('should render - success with elevation', async () => {
    const baseElement = render(GoACard, { testId: "card-test", width: 500, elevation:1 });
    const card = await baseElement.findByTestId('card-test');
    expect(card).toBeTruthy();
    expect(card.style.getPropertyValue("--width")).toEqual("500px");
    expect(card.style.getPropertyValue("box-shadow")).toEqual("var(--shadow-1)");
  });

  it('should render - success with border', async () => {
    const baseElement = render(GoACard, { testId: "card-test", width: 500, elevation:"0"});
    const card = await baseElement.findByTestId('card-test');

    expect(card).toBeTruthy();
    expect(card).toHaveStyle("border:");
  });
});
