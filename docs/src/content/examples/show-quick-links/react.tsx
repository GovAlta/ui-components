import { GoabAppFooter, GoabAppFooterMetaSection } from "@abgov/react-components";

export function ShowQuickLinks() {
  return (
    <GoabAppFooter maxContentWidth="100%">
      <GoabAppFooterMetaSection>
        <a href="#">Give feedback</a>
        <a href="#">Accessibility</a>
        <a href="#">Privacy</a>
        <a href="#">Contact us</a>
      </GoabAppFooterMetaSection>
    </GoabAppFooter>
  );
}
