import { GoabText } from "@abgov/react-components";

export function Feat2440Route() {
  return (
    <main>
      <GoabText id="blankID" mb="l">
        This element should have the id "blankID" and be the default with no tag.
      </GoabText>
      <GoabText tag="h1" id="headingID" mb="l">
        This element should have the id "headingID" and have an "h1" tag.
      </GoabText>
      <GoabText tag="p" size="heading-m" id="paragraphID" mb="l">
        This element should have the id "paragraphID" and have a "p" tag with a size of
        "heading-m"
      </GoabText>
    </main>
  );
}

export default Feat2440Route;
