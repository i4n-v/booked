import { AccountCircle } from "@mui/icons-material";
import { Badge, Box, Typography } from "@mui/material";
import {ChatItemProps} from "./types"
export default function ChatItem({ active, username,last_message, unread_messages,onClick } : ChatItemProps){
    return (
        <Box 
        onClick={() =>onClick()}
        sx={{
            backgroundColor: t => active ? t.palette.secondary[200] : t.palette.secondary.light,
            width: '100%',
            height: '104px',
            display: "flex",
            alignItems: "center",
            paddingLeft: "68px",
            cursor: "pointer"
        }}>
            <AccountCircle color="primary" sx={{ fontSize: "56px" }} />
            <Box sx={{ paddingLeft: "20px", paddingRight: "13px", width: "100%", display: "flex", flexDirection: "column", rowGap: "12px" }}>
                <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
                    <Typography sx={{ font: t => t.font.md }}>{username}</Typography>
                    <Typography sx={{ font: t => t.font.sm }}>11h</Typography>
                </Box>
                {last_message ? 
                <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
                    <Typography sx={{ font: t => t.font.xs, maxWidth: "306px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    { last_message}
                    </Typography>
                    <Typography sx={{ width: "25px", display: "flex", justifyContent: "center" }}>
                        <Badge badgeContent={unread_messages} max={99} color="primary" />
                    </Typography>
                </Box>
                : null}
            </Box>
        </Box >
    )
}