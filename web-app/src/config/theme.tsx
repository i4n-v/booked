import { createTheme } from "@mui/material"

const theme = createTheme({
    palette: {
        primary: {
            main: "#9B51E0"
        },
        secondary: {
            main:"#B3B3B3",
            light: "#F7F7F7"
        }
    },
    typography: {
        fontFamily: 'Montserrat',
    },
})

export default theme