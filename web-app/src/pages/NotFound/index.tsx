import { Box, Typography } from "@mui/material";
import { BookBackground } from "../../assets/SVG";
import Content from "../../components/Layout/Content/styles";

export default function NotFound() {
    return (
        <Content>
            <Box display={'flex'} justifyContent={'center'}>
                <BookBackground />
            </Box>
            <Typography
                sx={{
                    font: t => t.font.lg,
                    color: t => t.palette.secondary[500],
                    textAlign: "center"
                }}
            >
                {"404"}<br />
                {"Not Found"}
            </Typography>
        </Content>
    )
}