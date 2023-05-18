import { List, styled } from "@mui/material"

const CustomList = styled(List)(({ theme }) => ({
    overflow: "auto",
    [theme.breakpoints.down("md")]: {
        display: "flex",
    },
}))

export { CustomList }