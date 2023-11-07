import { AccountCircle, More } from "@mui/icons-material";
import { Box, Paper } from "@mui/material";
import { useState } from "react";
import MoreOptions from "../../../../components/MoreOptions";
import { MessageProps } from "./types"
import MessageImagePreview from "../Image/Preview";

export default function Message({ showAccount, response, content, id, actionsOptions, photo }: MessageProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  return (
    <Box
      onMouseOver={() => setShowOptions(true)}
      onMouseOut={() => setShowOptions(false)}
      onMouseLeave={() => setShowOptions(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: response ? "initial" : "row-reverse",
        columnGap: "12px",
      }}
    >
      <AccountCircle
        sx={{ display: showAccount && response ? "block" : "none" }}
        color="primary"
        fontSize="large"
      />
      <Paper
        sx={{
          backgroundColor: response ? "initial" : (t) => t.palette.primary[400],
          padding: "8px 12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "6px",
          wordBreak: "break-word",
          maxWidth: "550px",
          // maxHeight: "100px",
          height: "fit-content",
          marginLeft: showAccount || !response ? "initial" : "47px",
        }}
      >
        {photo ? <MessageImagePreview photoURL={photo} /> : content}
      </Paper>
      {!response && <Box display={showOptions ? "flex" : "none"} position={"relative"} alignItems={"center"} sx={{ cursor: "pointer" }}>
        <MoreOptions
          options={actionsOptions}
          open={dropdown}
          handleOpen={setDropdown}
          id={id as string}
        />
      </Box>}
    </Box>
  );
}
