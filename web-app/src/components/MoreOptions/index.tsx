import { MoreVert } from "@mui/icons-material";
import Dropdown from "../Dropdown";
import { Box, IconButton } from "@mui/material";
import { MoreOptionsProps } from "./types";

export default function MoreOptions({ open, options, id, handleOpen }: MoreOptionsProps) {
    return (
        <Box sx={{ zIndex: 5, position: 'absolute', right: 0 }}>
            <IconButton id={id} onClick={() => handleOpen(true)} color="primary" >
                <MoreVert />
            </IconButton>
            <Dropdown
                open={open}
                anchorId={id}
                options={options}
                handleClose={() => handleOpen(false)}
                minWidth="150px"
            />
        </Box>
    )
} 