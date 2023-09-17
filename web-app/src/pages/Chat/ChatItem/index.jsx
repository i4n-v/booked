import { AccountCircle } from "@mui/icons-material";
import { Badge, Box, Typography } from "@mui/material";

export default function ChatItem({ active }) {
    return (
        <Box sx={{
            backgroundColor: t => active ? t.palette.secondary[200] : t.palette.secondary.light,
            width: '100%',
            height: '104px',
            display: "flex",
            alignItems: "center",
            paddingLeft: "68px"
        }}>
            <AccountCircle color="primary" sx={{ fontSize: "56px" }} />
            <Box sx={{ paddingLeft: "20px", paddingRight: "13px", width: "100%", display: "flex", flexDirection: "column", rowGap: "12px" }}>
                <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
                    <Typography sx={{ font: t => t.font.md }}>Silvio Jose</Typography>
                    <Typography sx={{ font: t => t.font.sm }}>11h</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
                    <Typography sx={{ font: t => t.font.xs, maxWidth: "306px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Vou te passar umas dicas, sobre os melhores livros desta plataforma</Typography>
                    <Typography sx={{ width: "25px", display: "flex", justifyContent: "center" }}>
                        <Badge badgeContent={9} max={9} color="primary" />
                    </Typography>
                </Box>
            </Box>
        </Box >
    )
}