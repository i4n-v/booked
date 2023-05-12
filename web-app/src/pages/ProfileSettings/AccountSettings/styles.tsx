import { Box, styled } from "@mui/material";
import { InputAreaItemProps, InputAreaProps } from "./types";

const AccountSettingsContainer = styled('form')(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: "grid",
    rowGap: "40px"
}));

const PhotoInputContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    flexDirection: 'column',
    rowGap: '12px'
}));

const PhotoInputArea = styled(Box)(({ theme }) => ({
    width: '160px',
    height: '160px',
}));

const InputArea = styled(Box)<InputAreaProps>(({ theme, cols }) => ({
    display: 'grid',
    width: '100%',
    minHeight: '100%',
    gridTemplateColumns: `repeat(${cols},1fr)`,
    gridAutoRows: "minmax(min-content, max-content);"
}));

const InputAreaItem = styled(Box)<InputAreaItemProps>(({ theme, span = 1 }) => ({
    width: '100%',
    gridColumn: `auto / span ${span}`,
}));

export {
    AccountSettingsContainer,
    PhotoInputArea,
    PhotoInputContainer,
    InputArea,
    InputAreaItem
}