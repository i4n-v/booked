// .storybook/manager.js

import { addons } from "@storybook/manager-api";
import storyBookTheme from "./storyBookTheme";

addons.setConfig({
  theme: storyBookTheme,
});
