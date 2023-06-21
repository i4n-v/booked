import { createTheme, ThemeOptions } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "#9B51E0",
      light: "#CAAFE3",
      dark: "#1E0052",
      "400": "#E4D9EE",
      "500": "#CAAFE3",
      "600": "#B180DF",
      "700": "#9b51e0",
      "800": "#8824E6",
      "900": "#720ECF",
      A100: "#54079D",
      A200: "#38006C",
      A400: "#1E0052",
    },
    secondary: {
      main: "#121212",
      light: "#FFFFFF",
      dark: "#000000",
      "50": "#FFFFFF",
      "100": "#F7F7F7",
      "200": "#EDEDED",
      "300": "#DEDEDE",
      "400": "#CCCCCC",
      "500": "#B3B3B3",
      "600": "#9C9C9C",
      "700": "#707070",
      "800": "#595959",
      "900": "#404040",
      A100: "#2E2E2E",
      A200: "#121212",
      A400: "#000000",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: 18,
    },
  },
  font: {
    xxl: "500 6.125rem/6.875rem 'Montserrat', sans-serif ",
    xl: "500 3.813rem/4.625rem 'Montserrat', sans-serif ",
    lg: "500 2.188rem/2.625rem 'Montserrat', sans-serif ",
    md: "400 1.25rem/1.625rem 'Montserrat', sans-serif ",
    sm: "400 1rem/1.25rem 'Montserrat', sans-serif",
    xs: "400 0.875rem/1.125rem 'Montserrat', sans-serif ",
    "xs-b": "500 0.875rem/1.125rem 'Montserrat', sans-serif ",
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 640,
      md: 920,
      lg: 1200,
      xl: 1536,
    },
  },
});

theme.shadows[1] = "0px 1px 2px rgba(0, 0, 0, 0.1)";

const include: ThemeOptions = {
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          padding: 0,
          background: theme.palette.secondary.light,
          font: theme.font.xs,
          minHeight: "44px",
        },
        input: {
          font: theme.font.xs,
        },
        multiline: {
          height: 'auto',
          minHeight: "44px"
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: theme.palette.primary.main,
          "&:hover": {
            borderColor: theme.palette.primary.main,
          },
        },
        input: {
          color: theme.palette.secondary.main,
          "&::placeholder": {
            color: theme.palette.secondary.main,
          },
          padding: 0,
          paddingLeft: "12px",
          paddingRight: "14px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.secondary[800],
          font: theme.font["xs-b"],
          top: "0px",
        },
        outlined: {
          "&.MuiInputLabel-shrink": {
            transform: "translate(16px, -4px) scale(0.75)",
            top: "-2px",
          },
          '&.MuiInputLabel-root': {
            top: '-3px'
          }
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          font: theme.font.xs,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.secondary.main,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "12px 24px",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          height: 'auto'
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        input: {
          minHeight: '44px',
        },
        root: {
          '& .MuiOutlinedInput-root .MuiAutocomplete-input,.MuiOutlinedInput-root': {
            padding: '0 0 0 9px',
            minHeight: '44px',
          },

        }
      }
    }
  },
};
theme = createTheme(theme, include);

export default theme;
