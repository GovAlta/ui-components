import { GoabBadge, GoabText } from "@abgov/react-components";

export function Feat2374Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Feature #2374: Badge rich content
      </GoabText>

      <GoabText tag="h3">1. Text content</GoabText>
      <GoabBadge type="information" content="Text only" />

      <GoabText tag="h3">2. Bold text</GoabText>
      <GoabBadge type="information" content={<strong>Bold text</strong>} />

      <GoabText tag="h3">3. Strikethrough text</GoabText>
      <GoabBadge type="information" content={<s>Strikethrough text</s>} />

      <GoabText tag="h3">4. Underline text</GoabText>
      <GoabBadge type="information" content={<u>Underline text</u>} />

      <GoabText tag="h3">5. Text and badge</GoabText>
      <GoabBadge
        type="information"
        content={
          <>
            Application status
            <GoabBadge type="success" content="Active" />
          </>
        }
      />
    </div>
  );
}

export default Feat2374Route;
