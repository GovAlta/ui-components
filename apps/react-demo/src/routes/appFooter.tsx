import {
  GoAAppFooter,
  GoAAppFooterMetaSection,
  GoAAppFooterNavSection,
} from "@abgov/react-components";
import * as React from "react";

export default function AppFooter() {
  return (
    <>
      <h1>Footer</h1>

      <h2>Default </h2>
      <GoAAppFooter />

      <h2>Footer with links to meta information</h2>
      <GoAAppFooter>
        <GoAAppFooterMetaSection>
          <a href="privacy.html">Privacy</a>
          <a href="disclaimer.html">Disclaimer</a>
          <a href="accessibility.html">Accessibility</a>
          <a href="using-alberta.html">Using Alberta.ca</a>
        </GoAAppFooterMetaSection>
      </GoAAppFooter>

      <h2>Footer with secondary navigation</h2>
      <GoAAppFooter>
        <GoAAppFooterNavSection maxColumnCount={3}>
          <a href="a.html">Arts and culture</a>
          <a href="b.html">Education and training</a>
          <a href="c.html">Family and social supports</a>
          <a href="d.html">Housing and community</a>
          <a href="e.html">Life events</a>
          <a href="instagram.html">Instagram</a>
          <a href="youtube.html">YouTube</a>
          <a href="facebook.html">Facebook</a>
          <a href="snapchat.html">Snapchat</a>
          <a href="twitter.html">Twitter</a>
        </GoAAppFooterNavSection>
      </GoAAppFooter>

      <h2>Footer with secondary navigation with multiple sections</h2>
      <GoAAppFooter>
        <GoAAppFooterNavSection heading="All Services">
          <a href="a.html">Arts and culture</a>
          <a href="b.html">Education and training</a>
          <a href="c.html">Family and social supports</a>
          <a href="d.html">Housing and community</a>
          <a href="e.html">Life events</a>
        </GoAAppFooterNavSection>
        <GoAAppFooterNavSection heading="Social Media">
          <a href="instagram.html">Instagram</a>
          <a href="youtube.html">YouTube</a>
          <a href="facebook.html">Facebook</a>
          <a href="snapchat.html">Snapchat</a>
          <a href="twitter.html">Twitter</a>
        </GoAAppFooterNavSection>
      </GoAAppFooter>

      <h2>Footer with secondary navigation with multi column section</h2>
      <GoAAppFooter>
        <GoAAppFooterNavSection heading="All Services" maxColumnCount={2}>
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
        </GoAAppFooterNavSection>
        <GoAAppFooterNavSection heading="Social Media">
          <a href="instagram.html">Instagram</a>
          <a href="youtube.html">YouTube</a>
          <a href="facebook.html">Facebook</a>
          <a href="snapchat.html">Snapchat</a>
          <a href="twitter.html">Twitter</a>
        </GoAAppFooterNavSection>
      </GoAAppFooter>

      <h2>Footer with secondary navigation and links to meta information</h2>
      <GoAAppFooter>
        <GoAAppFooterNavSection maxColumnCount={2}>
          <a href="a.html">Arts and culture</a>
          <a href="b.html">Education and training</a>
          <a href="c.html">Family and social supports</a>
          <a href="d.html">Housing and community</a>
          <a href="e.html">Life events</a>
          <a href="instagram.html">Instagram</a>
          <a href="youtube.html">YouTube</a>
          <a href="facebook.html">Facebook</a>
          <a href="snapchat.html">Snapchat</a>
          <a href="twitter.html">Twitter</a>
        </GoAAppFooterNavSection>
        <GoAAppFooterMetaSection>
          <a href="privacy.html">Privacy</a>
          <a href="disclaimer.html">Disclaimer</a>
          <a href="accessibility.html">Accessibility</a>
          <a href="using-alberta.html">Using Alberta.ca</a>
        </GoAAppFooterMetaSection>
      </GoAAppFooter>

      <h2>
        Footer with secondary navigation with multiple sections and links to
        meta information
      </h2>
      <GoAAppFooter>
        <GoAAppFooterNavSection heading="All Services">
          <a href="a.html">Arts and culture</a>
          <a href="b.html">Education and training</a>
          <a href="c.html">Family and social supports</a>
          <a href="d.html">Housing and community</a>
          <a href="e.html">Life events</a>
        </GoAAppFooterNavSection>
        <GoAAppFooterNavSection heading="Social Media">
          <a href="instagram.html">Instagram</a>
          <a href="youtube.html">YouTube</a>
          <a href="facebook.html">Facebook</a>
          <a href="snapchat.html">Snapchat</a>
          <a href="twitter.html">Twitter</a>
        </GoAAppFooterNavSection>
        <GoAAppFooterMetaSection>
          <a href="privacy.html">Privacy</a>
          <a href="disclaimer.html">Disclaimer</a>
          <a href="accessibility.html">Accessibility</a>
          <a href="using-alberta.html">Using Alberta.ca</a>
        </GoAAppFooterMetaSection>
      </GoAAppFooter>
    </>
  );
}
