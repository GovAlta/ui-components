import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/svelte';
import GoASkeleton from './Skeleton.svelte';

afterEach(cleanup);

describe('GoARadioGroup Component', () => {
  for (const type of ["image", "text", "title", "text-small", "avatar", "header", "paragraph", "thumbnail", "card", "profile"]) {
    it(`should render the ${type} type`, async () => {
      const baseElement = render(GoASkeleton, { type });

      expect(baseElement.container.querySelector('.skeleton')).toBeTruthy()
    });
  }
});
