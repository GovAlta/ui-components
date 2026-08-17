import {
  GoabAppFooter,
  GoabAppFooterMetaSection,
  GoabAppFooterNavSection,
  GoabLink,
} from "@abgov/react-components";

export function DocsFooterRoute() {
  return (
    <div>
      <h2>Footer</h2>

      <h3>Basic footer</h3>
      <footer>
        <GoabAppFooter />
      </footer>

      <h3>With meta section</h3>
      <footer>
        <GoabAppFooter>
          <GoabAppFooterMetaSection>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms of use</a>
            <a href="/accessibility">Accessibility</a>
          </GoabAppFooterMetaSection>
        </GoabAppFooter>
      </footer>

      <h3>With navigation</h3>
      <footer>
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
      </footer>

      <h3>With meta and nav sections</h3>
      <footer>
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
      </footer>

      <h3>With links</h3>
      <footer>
        <GoabAppFooter>
          <GoabAppFooterNavSection heading="Services">
            <a href="/apply">Apply online</a>
            <GoabLink trailingIcon="open">
              <a href="https://www.alberta.ca/services">All services</a>
            </GoabLink>
          </GoabAppFooterNavSection>
          <GoabAppFooterMetaSection>
            <a href="/privacy">Privacy</a>
            <GoabLink>
              <a href="/accessibility">Accessibility</a>
            </GoabLink>
          </GoabAppFooterMetaSection>
        </GoabAppFooter>
      </footer>
    </div>
  );
}
