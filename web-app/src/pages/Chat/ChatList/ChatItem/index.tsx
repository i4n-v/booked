import { AccountCircle } from "@mui/icons-material";
import { Badge, Box, Typography } from "@mui/material";
import {ChatItemProps} from "./types"
import { useEffect, useState } from "react";
export default function ChatItem({ active, username,last_message, unread_messages,onClick } : ChatItemProps){
    const [unread,setUnread] = useState<number>()
    useEffect(() => {
        setUnread(unread_messages)
    },[unread_messages])
    return (
        <Box 
        onClick={() =>{
            onClick()
            setUnread(0)
        }}
        sx={{
            backgroundColor: t => active ? t.palette.secondary[200] : t.palette.secondary.light,
            maxWidth: '100%',
            width: "100%",
            height: '104px',
            display: "flex",
            alignItems: "center",
            paddingLeft: "68px",
            cursor: "pointer"
        }}>
            <AccountCircle color="primary" sx={{ fontSize: "56px" }} />
            <Box sx={{ paddingLeft: "20px", paddingRight: "13px", width: "-webkit-fill-available", display: "flex", flexDirection: "column", rowGap: "12px" }}>
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
                        <Badge badgeContent={unread} max={99} color="primary" />
                    </Typography>
                </Box>
                : null}
            </Box>
        </Box >
    )
}