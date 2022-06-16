import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/svelte'
import Divider from './Divider.svelte'

afterEach(cleanup);

describe('Divider', () => {
  const sizes = {
    small: "1rem",
    medium: "2rem",
    large: "4rem",
  };

  ["small", "medium", "large"].forEach(spacing => {
    it(`renders the ${spacing}}`, async () => {
      const { container } = render(Divider, { spacing })
      const el = container.querySelector("hr");
      expect(el.getAttribute("style")).toEqual(`--spacing: ${sizes[spacing]};`);
    })
  })
})
