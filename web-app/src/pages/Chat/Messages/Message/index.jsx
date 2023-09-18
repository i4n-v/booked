import { AccountCircle } from "@mui/icons-material";
import { Box, Paper } from "@mui/material";

export default function Message({ showAccount, response, content }) {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: response ? "initial" : "row-reverse",
            columnGap: "12px",
        }}>
            <AccountCircle sx={{ display: showAccount && response ? "block" : "none" }} color="primary" fontSize="large" />
            <Paper sx={{
                backgroundColor: response ? "initial" : t => t.palette.primary[400],
                padding: "8px 12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "6px",
                wordBreak: "break-word",
                maxWidth: "550px",
                marginLeft: showAccount || !response ? "initial" : "47px"
            }}>
                {content}
            </Paper>
        </Box >
    )
}