import { GoabButton, GoabBlock, GoabText } from "@abgov/react-components";

export function Feat3504TextButtonRoute() {
  return (
    <main>
      <GoabText as="h1" mt="none">
        feat(#3504): Add "text" type to Button component
      </GoabText>
      <GoabText>
        Demonstrates the new "text" type button variations. Requires design tokens from{" "}
        <a href="https://github.com/GovAlta/design-tokens/pull/156">
          GovAlta/design-tokens#156
        </a>
        .
      </GoabText>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <GoabBlock direction="row" gap="2xl" alignment="start">
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <GoabText as="h3">Regular button size</GoabText>

            <GoabButton type="text">Text Button</GoabButton>

            <GoabButton type="text" disabled={true}>
              Disabled Text Button
            </GoabButton>

            <GoabButton type="text" variant="destructive">
              Destructive Text Button
            </GoabButton>

            <GoabButton type="text" variant="destructive" disabled={true}>
              Destructive and Disabled Text Button
            </GoabButton>

            <div
              style={{
                backgroundColor: "#000",
                padding: "0.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <GoabButton type="text" variant="inverse">
                Inverse Text Button
              </GoabButton>

              <GoabButton type="text" variant="inverse" disabled={true}>
                Inverse and Disabled Text Button
              </GoabButton>
            </div>

            <GoabButton type="text" variant="dark">
              Dark Text Button
            </GoabButton>

            <GoabButton type="text" variant="dark" disabled={true}>
              Dark and Disabled Text Button
            </GoabButton>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <GoabText as="h3">Regular button size with icons</GoabText>

            <GoabButton type="text" leadingIcon="add">
              Leading Icon
            </GoabButton>

            <GoabButton type="text" trailingIcon="arrow-forward">
              Trailing Icon
            </GoabButton>

            <GoabButton type="text" leadingIcon="add" trailingIcon="arrow-forward">
              Leading and Trailing Icons
            </GoabButton>

            <GoabButton type="text" leadingIcon="add" disabled={true}>
              Disabled + Leading Icon
            </GoabButton>

            <GoabButton type="text" variant="destructive" leadingIcon="trash">
              Destructive + Leading Icon
            </GoabButton>

            <div
              style={{
                backgroundColor: "#000",
                padding: "0.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <GoabButton type="text" variant="inverse" leadingIcon="pencil">
                Inverse + Leading Icon
              </GoabButton>
            </div>

            <GoabButton type="text" variant="dark" leadingIcon="add">
              Dark + Leading Icon
            </GoabButton>
          </div>
        </GoabBlock>

        <GoabBlock direction="row" gap="2xl" alignment="start">
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <GoabText as="h3">Compact button size</GoabText>

            <GoabButton type="text" size="compact">
              Text Button
            </GoabButton>

            <GoabButton type="text" size="compact" disabled={true}>
              Disabled Text Button
            </GoabButton>

            <GoabButton type="text" size="compact" variant="destructive">
              Destructive Text Button
            </GoabButton>

            <GoabButton type="text" size="compact" variant="destructive" disabled={true}>
              Destructive and Disabled Text Button
            </GoabButton>

            <div
              style={{
                backgroundColor: "#000",
                padding: "0.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <GoabButton type="text" size="compact" variant="inverse">
                Inverse Text Button
              </GoabButton>

              <GoabButton type="text" size="compact" variant="inverse" disabled={true}>
                Inverse and Disabled Text Button
              </GoabButton>
            </div>

            <GoabButton type="text" size="compact" variant="dark">
              Dark Text Button
            </GoabButton>

            <GoabButton type="text" size="compact" variant="dark" disabled={true}>
              Dark and Disabled Text Button
            </GoabButton>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <GoabText as="h3">Compact button size with icons</GoabText>

            <GoabButton type="text" size="compact" leadingIcon="add">
              Leading Icon
            </GoabButton>

            <GoabButton type="text" size="compact" trailingIcon="arrow-forward">
              Trailing Icon
            </GoabButton>

            <GoabButton
              type="text"
              size="compact"
              leadingIcon="add"
              trailingIcon="arrow-forward"
            >
              Leading and Trailing Icons
            </GoabButton>

            <GoabButton type="text" size="compact" leadingIcon="add" disabled={true}>
              Disabled + Leading Icon
            </GoabButton>

            <GoabButton
              type="text"
              size="compact"
              variant="destructive"
              leadingIcon="trash"
            >
              Destructive + Leading Icon
            </GoabButton>

            <div
              style={{
                backgroundColor: "#000",
                padding: "0.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <GoabButton
                type="text"
                size="compact"
                variant="inverse"
                leadingIcon="pencil"
              >
                Inverse + Leading Icon
              </GoabButton>
            </div>

            <GoabButton type="text" size="compact" variant="dark" leadingIcon="add">
              Dark + Leading Icon
            </GoabButton>
          </div>
        </GoabBlock>
        <GoabText as="h3" mb="none">
          Invalid states
        </GoabText>
        <GoabButton type="secondary" variant="dark" size="compact">
          This non-text button with "dark" variant should cause a console warning
        </GoabButton>
      </div>
    </main>
  );
}

export default Feat3504TextButtonRoute;
