import { Box, styled } from "@mui/material";

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



export {
    PhotoInputArea,
    PhotoInputContainer,
}