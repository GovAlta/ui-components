import {
  GoabxAppFooter,
  GoabxAppFooterMetaSection,
} from "@abgov/react-components/experimental";

export function ShowQuickLinks() {
  return (
    <GoabxAppFooter maxContentWidth="100%">
      <GoabxAppFooterMetaSection>
        <a href="#">Give feedback</a>
        <a href="#">Accessibility</a>
        <a href="#">Privacy</a>
        <a href="#">Contact us</a>
      </GoabxAppFooterMetaSection>
    </GoabxAppFooter>
  );
}
