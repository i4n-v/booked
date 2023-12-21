import { Box, Button, styled } from "@mui/material";
import Content from "../../components/Layout/Content/styles";
export const ContainerProfile = styled(Content)(({ theme }) => ({
  display: "grid",
  gridTemplateRows: "260px 1fr",
  padding: "0px 20px 120px 20px",
  [theme.breakpoints?.down("md")]: {
    gridTemplateRows: "400px 1fr",
  },
}));

export const InfoContainer = styled(Box)(({ theme }) => ({
  minHeight: "260px",
  display: "flex",
  paddingTop: "60px",
  background: theme.palette.secondary[300],
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const ProfileImageBox = styled(Box)(({ theme }) => ({
  width: "160px",
  height: "160px",
  marginLeft: "40px",
  [theme.breakpoints.down("md")]: {
    marginLeft: "0px",
  },
}));

export const ProfileImage = styled("img")(({ theme, src }) => ({
  borderRadius: "50%",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: src ? "initial" : "none",
}));

export const UserProfileInfo = styled(Box)(({ theme }) => ({
  marginLeft: "40px",
  paddingTop: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "cente",
  alignContent: "center",
  rowGap: "8px",
  "& > p": {
    width: "478px",
    maxHeight: "54px",
    overflowY: "auto",
    font: theme.font.xs,
    textAlign: "justify",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      width: "fit-content",
      padding: "0px 20px",
    },
  },
  [theme.breakpoints.down("md")]: {
    marginLeft: "0px",
  },
}));

export const IdentityInfo = styled("span")(({ theme }) => ({
  "#name": {
    font: theme.font.md,
    color: theme.palette.secondary.A200,
  },
  "#user_name": {
    font: theme.font.xs,
    color: theme.palette.secondary[800],
  },
  "#dot": {
    width: "6px",
    height: "6px",
    background: theme.palette.primary.main,
    display: "inline-block",
    borderRadius: "50%",
  },
  display: "flex",
  alignItems: "center",
  columnGap: "8px",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
}));

export const LibraryInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  columnGap: "12px",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
}));

export const LibraryInfoBadge = styled("span")(({ theme }) => ({
  height: "30px",
  width: "fit-content",
  padding: "6px 12px",
  userSelect: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: theme.palette.secondary.A200,
  borderRadius: "4px",
  color: theme.palette.secondary.light,
  font: theme.font.xs,
  "& > span": {
    color: theme.palette.primary.main,
    paddingRight: "6px",
    fontWeight: "bolder",
  },
}));

export const FollowButton = styled(Button)(({ theme }) => ({
  height: "30px",
  padding: "6px 12px",
  fontSize: theme.typography.fontSize,
  textTransform: "none",
}));
