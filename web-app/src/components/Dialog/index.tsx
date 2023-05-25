import { Dialog, DialogTitle, Divider, IconButton, Typography } from "@mui/material";
import { DialogContainer } from "./styles";
import { iBookedDialog } from "./types";
import { Close } from "@mui/icons-material";

export default function Page({ width, height, onClose, ...props }: iBookedDialog) {

    return (
        <Dialog {...props} maxWidth={'lg'} onClose={onClose} >
            <DialogTitle id="dialog-title" sx={{
                height: '92px',
                padding: '40px 40px 0px 40px',
                display: 'flex',
                color: t => t.palette.secondary.A200,
                fontWeight: 600,
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Typography component={'span'} sx={{ font: t => t.font.lg }}>{props.title}</Typography>
                <IconButton color="primary" onClick={(e) => onClose(e, 'closeButton')}>
                    <Close style={{ width: '32px', height: '32px' }} />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContainer width={width} height={height}>
                {props.children}
            </DialogContainer>
        </Dialog>
    )
}
