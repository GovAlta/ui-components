import { GoabBadge, GoabFilterChip, GoabText } from "@abgov/react-components";

export function Feat1514Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Feature #1514: FilterChip rich content
      </GoabText>

      <GoabText tag="h3">1. Text content</GoabText>
      <GoabFilterChip content="Text only" />

      <GoabText tag="h3">2. Bold text</GoabText>
      <GoabFilterChip content={<strong>Bold text</strong>} />

      <GoabText tag="h3">3. Strikethrough text</GoabText>
      <GoabFilterChip content={<s>Strikethrough text</s>} />

      <GoabText tag="h3">4. Underline text</GoabText>
      <GoabFilterChip content={<u>Underline text</u>} />

      <div>
        <GoabText tag="h3">5. Text and badge</GoabText>
        <GoabFilterChip
          content={
            <>
              Application status
              <GoabBadge type="success" content="Active" />
            </>
          }
        />
      </div>
    </div>
  );
}

export default Feat1514Route;
