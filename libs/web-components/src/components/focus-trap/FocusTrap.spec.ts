
import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/svelte';
import FocusTrapTestComponent from './FocusTrapTestComponent.svelte';

afterEach(cleanup);

describe('Focus Trap Component', () => {

  it("Trap the tab key", async () => {
    const el = render(FocusTrapTestComponent);

    // This test is blocked due to JEST handling slot elements differently than web browser
    // For details, please refer https://goa-dio.atlassian.net/browse/DDIDS-704

    //fireEvent.keyUp(el.container.getElementsByClassName("email")[0], { key: 'Tab', keyCode: 9 });
    //expect(el.container.getElementsByClassName("email")[0]).toHaveFocus();
  });

});
