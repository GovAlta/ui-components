import { GoabBlock, GoabIcon, GoabText } from "@abgov/react-components";

export function Feat1741Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Feature #1741: Icon aria-hidden label
      </GoabText>

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="p">
        Test both icons with a screen reader. The 1st one has ariaLabel set to "Applicaton
        saved icon" and it shouldn't be read. The second one has ariaLabel set to
        "Important information" and it should be read.
      </GoabText>

      <GoabText tag="h3">Test 1: Decorative icon is hidden</GoabText>

      <GoabBlock direction="row" alignment="center">
        <GoabIcon
          type="checkmark-circle"
          ariaHidden={true}
          ariaLabel="Application saved icon"
        />
        <span>Application saved</span>
      </GoabBlock>

      <GoabText tag="h3">Test 2: Default icon remains accessible</GoabText>
      <GoabIcon type="information-circle" ariaLabel="Important information" />
    </div>
  );
}

export default Feat1741Route;
