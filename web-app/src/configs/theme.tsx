import { Breakpoint, createTheme, ThemeOptions } from "@mui/material"
import { TypographyOptions } from "@mui/material/styles/createTypography";

type SizeProps = Breakpoint | 'xxl' | 'xs-b'
type sizes = {
    [prop in SizeProps]: number | string;
};

declare module '@mui/material/styles' {
    interface Theme {
      sizes: sizes,
    }
    export interface ThemeOptions {
      sizes?: Partial<sizes>,
    }
  }

let theme = createTheme({
    palette: {
        primary: {
            main: "#9B51E0"
        }
    },
    typography: {
        allVariants:{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 18
        }
    },
    sizes: {
        xxl: '6.125rem',
        xl: '3.813rem',
        lg: '2.188rem',
        md: '1.25rem',
        sm: '1rem',
        "xs-b": '0.875rem' 
    }
})
const include: ThemeOptions = {
    components:{
        MuiInputBase:{
            styleOverrides:{
                root:{
                    height: theme.sizes.lg,
                    fontSize: theme.sizes["xs-b"],
                }
            }
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
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: theme.palette.primary.dark,
                fontSize: theme.sizes["xs-b"],
                top: '-9px'
              },
              outlined:{
                '&.MuiInputLabel-shrink': {
                    transform: 'translate(10px, -1px) scale(0.75)',
                    padding: '0 5px'
                  },
              }
            },
          },
      

    },
}
theme = createTheme(theme,include)

export default theme