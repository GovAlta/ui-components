import {
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabGrid,
  GoabIcon,
  GoabIconButton,
  GoabInput,
  GoabMenuAction,
  GoabMenuButton,
  GoabText,
} from "@abgov/react-components";
import {
  GoabIconBaseType,
  GoabIconOverridesType,
  GoabIconTheme,
  GoabIconType,
} from "@abgov/ui-components-common";

type IconType = {
  id: number;
  icon: GoabIconBaseType | GoabIconOverridesType;
};

const iconTypes: IconType[] = [
  { id: 1, icon: "accessibility" },
  { id: 2, icon: "backspace" },
  { id: 3, icon: "cafe" },
  { id: 4, icon: "desktop" },
  { id: 5, icon: "ear" },
  { id: 6, icon: "fast-food" },
  { id: 7, icon: "game-controller" },
  { id: 8, icon: "hammer" },
  { id: 9, icon: "ice-cream" },
  { id: 10, icon: "journal" },
  { id: 11, icon: "key" },
  { id: 12, icon: "laptop" },
  { id: 13, icon: "magnet" },
  { id: 14, icon: "navigate-circle" },
  { id: 15, icon: "open" },
  { id: 16, icon: "paper-plane" },
  { id: 17, icon: "qr-code" },
  { id: 18, icon: "radio" },
  { id: 19, icon: "sad" },
  { id: 20, icon: "tablet-landscape" },
  { id: 21, icon: "umbrella" },
  { id: 22, icon: "videocam-off" },
  { id: 23, icon: "walk" },
  { id: 24, icon: "add-circle" },
  { id: 25, icon: "bookmark" },
  { id: 26, icon: "calendar" },
  { id: 27, icon: "documents" },
  { id: 28, icon: "eye-off" },
  { id: 29, icon: "filter" },
  { id: 30, icon: "help-circle" },
  { id: 31, icon: "information-circle" },
  { id: 32, icon: "mail" },
  { id: 33, icon: "notifications" },
  { id: 34, icon: "open" },
  { id: 35, icon: "pencil" },
  { id: 36, icon: "remove" },
  { id: 37, icon: "search" },
  { id: 38, icon: "trash" },
  { id: 39, icon: "warning" },
];

const scenarios: {
  id: number;
  title: string;
  description: string;
  type: GoabIconType;
  theme?: GoabIconTheme;
}[] = [
  {
    id: 1,
    title: "New syntax :filled for type",
    description: "type uses :filled and no theme property is set.",
    type: "accessibility:filled",
  },
  {
    id: 2,
    title: "New syntax :outline for type",
    description: "type uses :outline and no theme property is set",
    type: "accessibility:outline",
  },
  {
    id: 3,
    title: "Conflicting type and theme",
    description: "type uses :filled, theme prop is outline. Type should win.",
    type: "accessibility:filled",
    theme: "outline",
  },
  {
    id: 4,
    title: "Legacy theme property - filled",
    description: "Setting filled via theme property, should still work",
    type: "accessibility",
    theme: "filled",
  },
  {
    id: 5,
    title: "Default outline",
    description:
      "No theme property, and no type setting the theme. Default should be outline",
    type: "accessibility",
  },
];

function filled(icon: IconType): GoabIconType {
  return `${icon.icon}:filled` as GoabIconType;
}

export function Feat1383Route() {
  return (
    <main>
      <GoabText tag="h1">1383: Button: Filled Icons</GoabText>

      <GoabGrid minChildWidth="400px" gap="l">
        {scenarios.map((scenario) => (
          <GoabBlock key={scenario.id} direction="column" gap="s">
            <GoabText tag="h2" size="heading-m">
              {scenario.title}
            </GoabText>
            <GoabText tag="p" size="body-s">
              {scenario.description}
            </GoabText>

            <GoabBlock direction="row" gap="m">
              <GoabIcon size="large" type={scenario.type} theme={scenario.theme} />
              <GoabBlock direction="column" gap="xs">
                <GoabText tag="p" size="body-s">
                  type: {scenario.type}
                </GoabText>
                <GoabText tag="p" size="body-s">
                  theme property: {scenario.theme ?? "(none)"}
                </GoabText>
              </GoabBlock>
            </GoabBlock>
          </GoabBlock>
        ))}
      </GoabGrid>

      <GoabText tag="h2" size="heading-m">
        Default icons (outline theme)
      </GoabText>
      <GoabGrid minChildWidth="200px" gap="m">
        {iconTypes.map((icon) => (
          <GoabBlock key={icon.id} direction="column" gap="xs" alignment="center">
            <GoabIcon size="large" type={icon.icon} />
            <GoabText tag="p" size="body-s">
              {icon.icon}
            </GoabText>
          </GoabBlock>
        ))}
      </GoabGrid>

      <GoabText tag="h2" size="heading-m">
        Filled via theme attribute
      </GoabText>
      <GoabGrid minChildWidth="200px" gap="m">
        {iconTypes.map((icon) => (
          <GoabBlock
            key={`theme-${icon.id}`}
            direction="column"
            gap="xs"
            alignment="center"
          >
            <GoabIcon size="large" type={icon.icon} theme="filled" />
            <GoabText tag="p" size="body-s">
              {icon.icon} (theme=filled)
            </GoabText>
          </GoabBlock>
        ))}
      </GoabGrid>

      <GoabText tag="h2" size="heading-m">
        Filled via type suffix
      </GoabText>
      <GoabGrid minChildWidth="200px" gap="m">
        {iconTypes.map((icon) => (
          <GoabBlock
            key={`filled-${icon.id}`}
            direction="column"
            gap="xs"
            alignment="center"
          >
            <GoabIcon size="large" type={filled(icon)} />
            <GoabText tag="p" size="body-s">
              {icon.icon}:filled
            </GoabText>
          </GoabBlock>
        ))}
      </GoabGrid>

      <GoabText tag="h2" size="heading-m">
        GoabBadge iconType property
      </GoabText>
      <GoabGrid minChildWidth="260px" gap="m">
        <GoabBlock direction="column" gap="xs" alignment="center">
          <GoabBadge
            type="information"
            icon
            iconType="accessibility"
            content="accessibility"
          />
        </GoabBlock>
        <GoabBlock direction="column" gap="xs" alignment="center">
          <GoabBadge
            type="information"
            icon
            iconType="accessibility:filled"
            content="accessibility:filled"
          />
        </GoabBlock>
      </GoabGrid>

      <GoabText tag="h2" size="heading-m">
        GoabButton leading/trailing icons properties
      </GoabText>
      <GoabGrid minChildWidth="260px" gap="m">
        <GoabBlock direction="column" gap="xs" alignment="center">
          <GoabButton
            type="primary"
            leadingIcon="accessibility"
            trailingIcon="accessibility"
          >
            accessibility
          </GoabButton>
        </GoabBlock>
        <GoabBlock direction="column" gap="xs" alignment="center">
          <GoabButton
            type="primary"
            leadingIcon="accessibility:filled"
            trailingIcon="accessibility:filled"
          >
            accessibility:filled
          </GoabButton>
        </GoabBlock>
      </GoabGrid>

      <GoabText tag="h2" size="heading-m">
        GoabIconButton icon property
      </GoabText>
      <GoabGrid minChildWidth="200px" gap="m">
        <GoabBlock direction="column" gap="xs" alignment="center">
          <GoabIconButton
            icon="accessibility"
            ariaLabel="icon button"
            size="large"
            title="accessibility"
          />
        </GoabBlock>
        <GoabBlock direction="column" gap="xs" alignment="center">
          <GoabIconButton
            icon="accessibility:filled"
            ariaLabel="icon button"
            size="large"
            title="accessibility:filled"
          />
        </GoabBlock>
      </GoabGrid>

      <GoabText tag="h2" size="heading-m">
        GoabInput leading/trailing icon properties
      </GoabText>
      <GoabGrid minChildWidth="320px" gap="m">
        <GoabBlock direction="column" gap="xs">
          <GoabInput
            name="base-icon"
            placeholder="accessibility"
            leadingIcon="accessibility"
            trailingIcon="accessibility"
          />
        </GoabBlock>
        <GoabBlock direction="column" gap="xs">
          <GoabInput
            name="filled-icon"
            placeholder="accessibility:filled"
            leadingIcon="accessibility:filled"
            trailingIcon="accessibility:filled"
          />
        </GoabBlock>
      </GoabGrid>

      <GoabText tag="h2" size="heading-m">
        GoabMenuButton icon property
      </GoabText>
      <GoabGrid minChildWidth="320px" gap="m">
        <GoabBlock direction="column" gap="xs">
          <GoabMenuButton text="accessibility">
            <GoabMenuAction text="accessibility" action="action" icon="accessibility" />
          </GoabMenuButton>
        </GoabBlock>
        <GoabBlock direction="column" gap="xs">
          <GoabMenuButton text="accessibility:filled">
            <GoabMenuAction
              text="accessibility:filled"
              action="action"
              icon="accessibility:filled"
            />
          </GoabMenuButton>
        </GoabBlock>
      </GoabGrid>
    </main>
  );
}

export default Feat1383Route;
