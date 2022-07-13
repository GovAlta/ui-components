import {
  GoAAppHeader,
  GoAMicrositeHeader,
  GoAAppFooter,
  GoAPageBlock,
  GoAPage,
  GoAAppFooterNavSection,
  GoAAppFooterMetaSection,
} from '@abgov/react-components';
import { Outlet } from 'react-router-dom';

export function App() {

  return (
    <GoAPage>
      <section slot="header">
        <GoAMicrositeHeader level="alpha" version="UAT" />
        <GoAAppHeader url="/" title="Design System">
          <a href="/login">Sign in</a>
        </GoAAppHeader>
      </section>

      <GoAPageBlock width="704px">
        <Outlet />
      </GoAPageBlock>

      <section slot="footer">
        <GoAAppFooter>
          <GoAAppFooterNavSection name="Links" maxColumnCount={3}>
            <a href="a.html">Arts and culture</a>
            <a href="b.html">Education and training</a>
            <a href="c.html">Family and social supports</a>
            <a href="d.html">Housing and community</a>
            <a href="e.html">Life events</a>
            <a href="f.html">Business and economy</a>
            <a href="g.html">Emergencies and public safety and something else</a>
            <a href="h.html">Government</a>
            <a href="i.html">Jobs and employment</a>
            <a href="j.html">Moving to Alberta</a>
          </GoAAppFooterNavSection>

          <GoAAppFooterNavSection name="Media">
            <a href="instagram.html">Instagram</a>
            <a href="youtube.html">YouTube</a>
            <a href="facebook.html">Facebook</a>
            <a href="snapchat.html">Snapchat</a>
            <a href="twitter.html">Twitter's really long link</a>
          </GoAAppFooterNavSection>

          <GoAAppFooterMetaSection>
            <a href="contact.html">Contact Us</a>
            <a href="support.html">Support</a>
            <a href="hours.html">Hours</a>
            <a href="about.html">About Us</a>
            <a href="careers.html">Careers</a>
            <a href="contact.html">Contact Us</a>
            <a href="support.html">Support</a>
            <a href="hours.html">Hours</a>
            <a href="about.html">About Us</a>
            <a href="careers.html">Careers</a>
            <a href="contact.html">Contact Us</a>
            <a href="support.html">Support</a>
            <a href="hours.html">Hours</a>
            <a href="about.html">About Us</a>
            <a href="careers.html">Careers</a>
          </GoAAppFooterMetaSection>
        </GoAAppFooter>
      </section>
    </GoAPage>
  );
}

export default App;
