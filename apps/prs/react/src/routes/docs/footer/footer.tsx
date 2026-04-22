import {
  GoabAppFooter,
  GoabAppFooterMetaSection,
  GoabAppFooterNavSection,
} from "@abgov/react-components";

export function DocsFooterRoute() {
  return (
    <div>
      <h2>Footer</h2>

      <h3>Basic footer</h3>
      <GoabAppFooter />

      <h3>With meta section</h3>
      <GoabAppFooter>
        <GoabAppFooterMetaSection>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms of use</a>
          <a href="/accessibility">Accessibility</a>
        </GoabAppFooterMetaSection>
      </GoabAppFooter>

      <h3>With navigation</h3>
      <GoabAppFooter>
        <GoabAppFooterNavSection heading="Services">
          <a href="/apply">Apply online</a>
          <a href="/renew">Renew</a>
          <a href="/status">Check status</a>
        </GoabAppFooterNavSection>
        <GoabAppFooterNavSection heading="Contact">
          <a href="/help">Help center</a>
          <a href="/feedback">Feedback</a>
        </GoabAppFooterNavSection>
      </GoabAppFooter>

      <h3>With meta and nav sections</h3>
      <GoabAppFooter>
        <GoabAppFooterNavSection heading="Services">
          <a href="/apply">Apply online</a>
          <a href="/renew">Renew</a>
          <a href="/status">Check status</a>
        </GoabAppFooterNavSection>
        <GoabAppFooterNavSection heading="Contact">
          <a href="/help">Help center</a>
          <a href="/feedback">Feedback</a>
        </GoabAppFooterNavSection>
        <GoabAppFooterMetaSection>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms of use</a>
          <a href="/accessibility">Accessibility</a>
        </GoabAppFooterMetaSection>
      </GoabAppFooter>
    </div>
  );
}
