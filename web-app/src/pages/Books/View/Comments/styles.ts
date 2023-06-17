import { Box, styled } from "@mui/material"

export const CommentsContainer = styled(Box)(({ theme }) => ({
    marginTop: "60px",
    display: "flex",
    flexDirection: "column",
    rowGap: "40px"
}))

export const CommentsContainerHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "8px",
    "& > span": {
        font: theme.font.lg
    }
}))

export const CommentsList = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    rowGap: "20px"
}))

export const CommentBox = styled(Box)<{response?: boolean}>(({ theme ,response}) => ({
    minHeight: "fit-content",
    backgroundColor: response ? theme.palette.secondary[300]  : theme.palette.secondary.light,
    borderLeft: !response ? `8px solid ${theme.palette.primary[700]}` : "none",
    marginLeft: response ? "80px" : "initial",
    boxShadow: theme.shadows[0],
    borderRadius: "5px",
    padding: "20px"
}))

