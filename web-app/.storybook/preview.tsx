import React from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../src/configs/Theme/theme";
import { initialize, mswLoader } from "msw-storybook-addon";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import queryClient from "../src/configs/queryCLient";

initialize();

const preview: Preview = {
  parameters: {
    layout: "centered",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: theme.palette.secondary["A100"],
        },
        {
          name: "light",
          value: theme.palette.secondary["200"],
        },
      ],
    },
  },
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Story />
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    ),
  ],
};

export default preview;
