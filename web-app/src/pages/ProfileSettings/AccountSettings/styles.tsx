import { Box, styled } from "@mui/material";
import { InputAreaItemProps, InputAreaProps } from "./types";

const AccountSettingsContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: "grid",
    gridTemplateRows: "1fr 1fr"
}));

const PhotoInputContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
}));

const PhotoInputArea = styled(Box)(({ theme }) => ({
    width: '200px',
    height: '200px',
    [theme.breakpoints?.down("md")]: {
        width: '100px',
        height: '100px',
    },
}));

const InputArea = styled(Box)<InputAreaProps>(({ theme, cols }) => ({
    display: 'grid',
    width: '100%',
    height: '100%',
    gridTemplateColumns: `repeat(${cols},1fr)`,
    gridAutoRows: "minmax(min-content, max-content);"
}));

const InputAreaItem = styled(Box)<InputAreaItemProps>(({ theme, colsSpan = 1 }) => ({
    width: '100%',
    gridColumn: `auto / span ${colsSpan}`,
}));

export {
    AccountSettingsContainer,
    PhotoInputArea,
    PhotoInputContainer,
    InputArea,
    InputAreaItem
}