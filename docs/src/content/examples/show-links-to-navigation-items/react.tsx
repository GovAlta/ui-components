import { GoabAppFooter, GoabAppFooterMetaSection, GoabAppFooterNavSection } from "@abgov/react-components";

export function ShowLinksToNavigationItems() {
  return (
    <GoabAppFooter maxContentWidth="100%">
      <GoabAppFooterNavSection maxColumnCount={1}>
        <a href="a.html">Arts and culture</a>
        <a href="b.html">Education and training</a>
        <a href="c.html">Family and social supports</a>
        <a href="d.html">Housing and community</a>
        <a href="e.html">Life events</a>
        <a href="f.html">Business and economy</a>
        <a href="g.html">Emergencies and public safety</a>
        <a href="h.html">Government</a>
        <a href="i.html">Jobs and employment</a>
        <a href="j.html">Moving to Alberta</a>
      </GoabAppFooterNavSection>
      <GoabAppFooterMetaSection>
        <a href="privacy.html">Privacy</a>
        <a href="disclaimer.html">Disclaimer</a>
        <a href="accessibility.html">Accessibility</a>
        <a href="using-alberta.html">Using Alberta.ca</a>
      </GoabAppFooterMetaSection>
    </GoabAppFooter>
  );
}
