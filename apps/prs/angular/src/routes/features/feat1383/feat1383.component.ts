import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
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
} from "@abgov/angular-components";
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

@Component({
  standalone: true,
  selector: "abgov-feat1383",
  templateUrl: "./feat1383.component.html",
  imports: [
    CommonModule,
    GoabText,
    GoabGrid,
    GoabBlock,
    GoabIcon,
    GoabBadge,
    GoabButton,
    GoabIconButton,
    GoabInput,
    GoabMenuButton,
    GoabMenuAction,
  ],
})
export class Feat1383Component {
  readonly iconTypes = iconTypes;
  readonly scenarios = scenarios;

  filled(icon: IconType): GoabIconType {
    return `${icon.icon}:filled` as GoabIconType;
  }
}
