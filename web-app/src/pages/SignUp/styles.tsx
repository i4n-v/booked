import { Box, styled } from "@mui/material";
import registerBg from "../../assets/IMG/register-bg.jpg";

const SignUpContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  height: "100vh",
  maxWidth: "100%",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const AsideBackground = styled(Box)(({ theme }) => ({
  height: "100%",
  backgroundImage: `url(${registerBg})`,
  backgroundSize: "cover",
  objectFit: "cover",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
  filter: "brightness(50%)",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const FormContainer = styled(Box)(({ theme }) => ({
  alignSelf: "center",
  justifySelf: "center",
  width: "100%",
  maxWidth: "560px",
  padding: "0 20px",
  "& > h1": {
    font: theme.font.xl,
    color: theme.palette.secondary.A200,
    marginBottom: "60px",
    "& > span": {
      font: "inherit",
      color: theme.palette.primary[700],
    },
  },
  "& > form": {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    "& > p": {
      font: theme.font.xs,
      color: theme.palette.secondary[800],
      "& a": {
        font: theme.font.xs,
        textDecoration: "none",
        fontWeight: 600,
        color: theme.palette.primary[700],
      },
    },
    "& > button": {
      maxWidth: "fit-content",
    },
  },
  [theme.breakpoints.down("sm")]: {},
}));

export { SignUpContainer, AsideBackground, FormContainer };
