import { create } from "@storybook/theming/create";
import logo from "../libs/shared/storybook-common/assets/GOALogo.svg";

export default create({
  base: "light",
  colorPrimary: "#005daa",
  colorSecondary: "#005daa",

  // Typography
  fontBase: "acumin-pro-semi-condensed, sans-serif",
  fontCode: "monospace",

  brandTitle: "Alberta Design System",
  brandUrl: "https://alberta.ca",
  brandImage: logo,
});
