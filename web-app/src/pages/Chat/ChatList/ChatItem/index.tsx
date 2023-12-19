import { AccountCircle, Groups } from "@mui/icons-material";
import { Badge, Box, Typography } from "@mui/material";
import { ChatItemProps } from "./types";
import { useEffect, useState } from "react";
import TimePast from "../../../../helpers/TimePast";
import ProfilePhoto from "../../ProfilePhoto";
export default function ChatItem({
  active,
  username,
  last_message,
  unread_messages,
  last_update,
  profile_photo,
  group,
  onClick,
}: ChatItemProps) {
  const [unread, setUnread] = useState<number>();
  useEffect(() => {
    setUnread(unread_messages);
  }, [unread_messages]);
  return (
    <Box
      onClick={() => {
        onClick();
        setUnread(0);
      }}
      sx={{
        backgroundColor: (t) =>
          active ? t.palette.secondary[300] : t.palette.secondary.light,
        maxWidth: "100%",
        width: "100%",
        height: "104px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingLeft: "68px",
        cursor: "pointer",
        ":hover": {
          backgroundColor: (t) =>
            active ? t.palette.secondary[300] : t.palette.secondary[200],
        },
      }}
    >
      {group ? (
        <Groups color="primary" sx={{ fontSize: "56px" }} />
      ) : profile_photo ? (
        <ProfilePhoto size={"56px"} src={profile_photo} />
      ) : (
        <AccountCircle color="primary" sx={{ fontSize: "56px" }} />
      )}
      <Box
        sx={{
          paddingLeft: "20px",
          paddingRight: "20px",
          width: "-webkit-fill-available",
          display: "flex",
          flexDirection: "column",
          rowGap: "12px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ font: (t) => t.font.md }}>{username}</Typography>
          <Typography sx={{ font: (t) => t.font.sm }}>
            {TimePast(last_update)}
          </Typography>
        </Box>
        {last_message ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                font: (t) => t.font.xs,
                maxWidth: "280px",
                overflow: "hidden",
                width: "-webkit-fill-available",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                maxHeight: "17px",
              }}
            >
              {last_message}
            </Typography>
            <Typography
              sx={{ width: "25px", display: "flex", justifyContent: "center" }}
            >
              <Badge badgeContent={unread} max={99} color="primary" />
            </Typography>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
