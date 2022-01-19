import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import GoAHeroBanner from './hero-banner';
import GoAHeroBannerContent from './hero-banner-content';
import GoAHeroBannerLink from './hero-banner-actions';

afterEach(cleanup);

describe('GoAHeroBanner', () => {
  test('Renders all with properties', () => {
    const { container } = render(
      <GoAHeroBanner
        title="Upgrading our bitumen"
        backgroundUrl=""
        content="Main content"
        linkText="Learn more"
        linkUrl="http://google.com"
      ></GoAHeroBanner>
    );

    expect(screen.getByRole('heading').textContent).toEqual(
      'Upgrading our bitumen'
    );
    expect(screen.getByRole('note').textContent).toEqual('Main content');
    expect(screen.getByRole('link').textContent).toEqual('Learn more');
  });

  test('Only title with properties', async () => {
    const { container } = render(
      <GoAHeroBanner
        title="Upgrading our bitumen"
        backgroundUrl=""
      ></GoAHeroBanner>
    );

    expect(screen.getByRole('heading').textContent).toEqual(
      'Upgrading our bitumen'
    );
    expect(screen.queryByRole('note')).toBeFalsy();
    expect(screen.queryAllByRole('link').length).toEqual(0);
  });

  test('Title and content with properties', async () => {
    const { container } = render(
      <GoAHeroBanner
        title="Upgrading our bitumen"
        backgroundUrl=""
        content="Main content"
      ></GoAHeroBanner>
    );

    expect(screen.getByRole('heading').textContent).toEqual(
      'Upgrading our bitumen'
    );
    expect(screen.getByRole('note').textContent).toEqual('Main content');
    expect(screen.queryAllByRole('link').length).toEqual(0);
  });

  test('Title and link with properties', async () => {
    const { container } = render(
      <GoAHeroBanner
        title="Upgrading our bitumen"
        backgroundUrl=""
        linkText="Learn more"
        linkUrl="http://google.com"
      ></GoAHeroBanner>
    );

    expect(screen.getByRole('heading').textContent).toEqual(
      'Upgrading our bitumen'
    );
    expect(screen.queryByRole('note')).toBeFalsy();
    expect(screen.getByRole('link').textContent).toEqual('Learn more');
  });

  test('Renders all with child components', () => {
    const { container } = render(
      <GoAHeroBanner title="Upgrading our bitumen" backgroundUrl="">
        <GoAHeroBannerContent content="Main content" />
        <GoAHeroBannerLink linkText="Learn more" linkUrl="http://google.com" />
      </GoAHeroBanner>
    );

    expect(screen.getByRole('heading').textContent).toEqual(
      'Upgrading our bitumen'
    );
    expect(screen.getByRole('note').textContent).toEqual('Main content');
    expect(screen.getByRole('link').textContent).toEqual('Learn more');
  });

  test('Only title with child components', async () => {
    const { container } = render(
      <GoAHeroBanner title="Upgrading our bitumen" backgroundUrl="">
      </GoAHeroBanner>
    );

    expect(screen.getByRole('heading').textContent).toEqual(
      'Upgrading our bitumen'
    );
    expect(screen.queryByRole('note')).toBeFalsy();
    expect(screen.queryAllByRole('link').length).toEqual(0);
  });

  test('Title and content with child components', async () => {
    const { container } = render(
      <GoAHeroBanner title="Upgrading our bitumen" backgroundUrl="">
        <GoAHeroBannerContent content="Main content" />
      </GoAHeroBanner>
    );

    expect(screen.getByRole('heading').textContent).toEqual(
      'Upgrading our bitumen'
    );
    expect(screen.getByRole('note').textContent).toEqual('Main content');
    expect(screen.queryAllByRole('link').length).toEqual(0);
  });

  test('Title and link with child components', async () => {
    const { container } = render(
      <GoAHeroBanner title="Upgrading our bitumen" backgroundUrl="">
        <GoAHeroBannerLink linkText="Learn more" linkUrl="http://google.com" />
      </GoAHeroBanner>
    );

    expect(screen.getByRole('heading').textContent).toEqual(
      'Upgrading our bitumen'
    );
    expect(screen.queryAllByRole('note').length).toEqual(0);
    expect(screen.getByRole('link').textContent).toEqual('Learn more');
  });

});
