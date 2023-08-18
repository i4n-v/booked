import { create } from "@storybook/theming/create";

const logo = require("../src/assets/SVG/logo-light.svg") as string;

const storyBookTheme = create({
  base: "dark",
  brandTitle: "Booked",
  brandUrl: "#",
  brandImage: logo,
  brandTarget: "_self",
});

export default storyBookTheme;
