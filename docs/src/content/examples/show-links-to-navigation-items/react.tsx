import {
  GoabxAppFooter,
  GoabxAppFooterMetaSection,
  GoabxAppFooterNavSection,
} from "@abgov/react-components/experimental";

export function ShowLinksToNavigationItems() {
  return (
    <GoabxAppFooter maxContentWidth="100%">
      <GoabxAppFooterNavSection maxColumnCount={1}>
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
      </GoabxAppFooterNavSection>
      <GoabxAppFooterMetaSection>
        <a href="privacy.html">Privacy</a>
        <a href="disclaimer.html">Disclaimer</a>
        <a href="accessibility.html">Accessibility</a>
        <a href="using-alberta.html">Using Alberta.ca</a>
      </GoabxAppFooterMetaSection>
    </GoabxAppFooter>
  );
}
