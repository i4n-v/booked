import { Box, Button, styled } from "@mui/material";

const ProfileImage = styled(Box)({
  width: "53px",
  height: "53px",
  borderRadius: "50%",
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const ProfileContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "376px",
  minWidth: "376px",
  height: "136px",
  background: theme.palette.secondary.light,
  boxShadow: theme.shadows[1],
  borderRadius: "8px",
  cursor: "pointer",
  padding: "12px",
}));

const UserInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "12px",
});

const UserInfoText = styled(Box)(({ theme }) => ({
  marginLeft: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  "& > span": {
    font: theme.font.sm,
    color: theme.palette.secondary.A200,
  },
  "& > span + span": {
    font: theme.font.xs,
    color: theme.palette.secondary[800],
  },
}));

const DescriptionText = styled(Box)(({ theme }) => ({
  font: theme.font.xs,
  color: theme.palette.secondary[900],
}));

const FollowButton = styled(Button)(({ theme }) => ({
  height: "30px",
  padding: "6px 12px",
  fontSize: theme.typography.fontSize,
  textTransform: "none",
  marginLeft: "auto",
}));

export {
  ProfileContainer,
  ProfileImage,
  UserInfo,
  UserInfoText,
  DescriptionText,
  FollowButton,
};
