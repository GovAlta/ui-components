import { render } from '@testing-library/react';

import FooterMetaSection from './footer-meta-section';

describe('FooterMetaSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FooterMetaSection />);
    expect(baseElement).toBeTruthy();
  });
});
