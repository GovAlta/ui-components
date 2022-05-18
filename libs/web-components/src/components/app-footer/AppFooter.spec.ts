import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/svelte';
import GoAAppFooter from './AppFooterWrapper.test.svelte';

function createElement(props = {}) {
  return render(GoAAppFooter, { ...props });
}

describe('GoAAppFooter Component', () => {

  it("should render", async () => {
    const el = createElement();
    const appFooterContainer = el.container.querySelector('.app-footer-container');
    expect(appFooterContainer).toBeTruthy();
  });

  it("allows for setting copyright details", async () => {
    const el = createElement({copyrighturl: "http://alberta.ca/design-systems", copyrighttext: "abc"});
    const copyrightLink = el.container.querySelector('.goa-copyright');
    expect(copyrightLink).toBeTruthy();
    expect((copyrightLink as HTMLAnchorElement).href).toBe("http://alberta.ca/design-systems");
    expect(copyrightLink.innerHTML).toBe("© abc");
  });

  it("allows for setting app url details", async () => {
    const el = createElement({appurl: "http://alberta.ca/design-systems", title: "abc"});
    const logo = el.container.querySelector('.logo');
    expect(logo).toBeTruthy();
    const logoLink = (logo.parentElement as HTMLAnchorElement);
    expect(logoLink).toBeTruthy();
    expect(logoLink.href).toBe("http://alberta.ca/design-systems");
    expect(logoLink.title).toBe("abc");
  });

  it("allows for setting copyright details", async () => {
    const el = createElement({copyrighturl: "http://alberta.ca/design-systems", copyrighttext: "abc"});
    const copyrightLink = el.container.querySelector('.goa-copyright');
    expect(copyrightLink).toBeTruthy();
    expect((copyrightLink as HTMLAnchorElement).href).toBe("http://alberta.ca/design-systems");
    expect(copyrightLink.innerHTML).toBe("© abc");
  });

  it("allows for setting of meta links", async () => {

    const metalinks = [
      { "url":"A", "title": "xyz1" },
      { "url":"B", "title": "xyz2" },
      { "url":"C", "title": "xyz3" },
      { "url":"D", "title": "xyz4" }
    ];

    const el = createElement({ metaLinks: metalinks });

    await waitFor(() => {
      const metaLinks = el.container.querySelectorAll('.meta-link');

      const urls: string[] = [];
      const title: string[] = [];
      metaLinks.forEach(function(metaLink) {
        const linkElement = (metaLink as HTMLAnchorElement);
        urls.push(linkElement.href);
        title.push(linkElement.text);
      });

      expect(urls.sort()).toEqual(["http://localhost/A", "http://localhost/B", "http://localhost/C", "http://localhost/D"]);
      expect(title.sort()).toEqual(["xyz1", "xyz2", "xyz3", "xyz4"]);

      const navigationLink = el.container.querySelectorAll('.navigation-link');
      expect(navigationLink.length).toBe(0);
    });

  });

  it("allows for setting of navigation links", async () => {

    const navigationlinks = [
      { "url":"A", "title": "xyz1" },
      { "url":"B", "title": "xyz2" },
      { "url":"C", "title": "xyz3" },
      { "url":"D", "title": "xyz4" }
    ];

    const el = createElement({ navigationLinks: navigationlinks });

    await waitFor(() => {
      const navigationLinks = el.container.querySelectorAll('.navigation-link');
      const urls: string[] = [];
      const title: string[] = [];
      navigationLinks.forEach(function(navigationLink) {
        const linkElement = (navigationLink as HTMLAnchorElement);
        urls.push(linkElement.href);
        title.push(linkElement.text);
      });

      expect(urls.sort()).toEqual(["http://localhost/A", "http://localhost/B", "http://localhost/C", "http://localhost/D"]);
      expect(title.sort()).toEqual(["xyz1", "xyz2", "xyz3", "xyz4"]);

      const metaLink = el.container.querySelectorAll('.meta-link');
      expect(metaLink.length).toBe(0);
    });

  });

  it("allows for setting of navigation sections", async () => {

    const navigationsections = [
      { "name": "AAA", "links": [{ "url":"A", "title": "xyz1" }, { "url":"B", "title": "xyz2" }]},
      { "name": "BBB", "links": [{ "url":"C", "title": "xyz3" }, { "url":"D", "title": "xyz4" } , { "url":"E", "title": "xyz5" }]},
      { "name": "CCC", "links": [{ "url":"F", "title": "xyz6" }]}
    ];

    const el = createElement({ navigationSections: navigationsections });

    await waitFor(() => {

      const sectionNames = el.container.querySelectorAll('.navigation-section-name');
      const names: string[] = [];
      sectionNames.forEach(function(sectionName) {
        const element = (sectionName as HTMLElement);
        names.push((element.firstChild as HTMLElement).textContent);
      });
      expect(names.sort()).toEqual(["AAA", "BBB", "CCC"]);

      const navigationLinks = el.container.querySelectorAll('.navigation-link');
      const urls: string[] = [];
      const title: string[] = [];
      navigationLinks.forEach(function(navigationLink) {
        const linkElement = (navigationLink as HTMLAnchorElement);
        urls.push(linkElement.href);
        title.push(linkElement.text);
      });

      expect(urls.sort()).toEqual(["http://localhost/A", "http://localhost/B", "http://localhost/C", "http://localhost/D", "http://localhost/E", "http://localhost/F"]);
      expect(title.sort()).toEqual(["xyz1", "xyz2", "xyz3", "xyz4", "xyz5", "xyz6"]);

      const metaLink = el.container.querySelectorAll('.meta-link');
      expect(metaLink.length).toBe(0);

    });

  });

});
