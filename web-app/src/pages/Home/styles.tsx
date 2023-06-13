import { Box, styled } from "@mui/material";
import introducitionBg from "../../assets/IMG/introduction-bg.png";

const IntroductionContainer = styled(Box)(({ theme }) => ({
  background: `url(${introducitionBg})`,
  backgroundSize: "cover",
  backgroundPosition: "50% 58%",
  backgroundRepeat: "no-repeat",
  height: "654px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "80px",
  padding: "20px",
  position: "relative",
  "& > .title": {
    maxWidth: "1400px",
    width: "100%",
    zIndex: 2,
    "& > h1": {
      font: theme.font.xxl,
      color: theme.palette.secondary[50],
      maxWidth: "1030px",
    },
    "& > h1 + p": {
      font: theme.font.lg,
      color: theme.palette.secondary.light,
      zIndex: 1000,
      mt: "12px",
      opacity: 0.5,
    },
    "& span": {
      font: "inherit",
      color: theme.palette.primary[700],
    },
  },
  "& > form": {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  [theme.breakpoints.down("md")]: {
    "& > .title > h1": {
      font: theme.font.xl,
      maxWidth: "600px",
    },
    "& > .title > h1 + p": {
      font: theme.font.md,
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& > .title > h1": {
      font: theme.font.lg,
      maxWidth: "400px",
    },
    "& > .title > h1 + p": {
      font: theme.font.sm,
    },
  },
}));

const CallToActionContainer = styled(Box)(({ theme }) => ({
  height: "800px",
  background: theme.palette.secondary.A200,
  boxShadow: `inset 0 80px ${theme.palette.secondary[100]}, inset 0 -80px ${theme.palette.secondary[100]}`,
  padding: "0 20px",
  "& > div": {
    display: "flex",
    alignItems: "center",
    gap: "40px",
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    "& > .container": {
      maxWidth: "678px",
      "& h2": {
        color: theme.palette.secondary.light,
        font: theme.font.xl,
        marginBottom: "40px",
        "& > span": {
          color: theme.palette.primary[700],
        },
      },
      "& p": {
        font: theme.font.md,
        color: theme.palette.secondary[400],
        marginBottom: "32px",
      },
    },
    "& > .image": {
      width: "100%",
      maxWidth: "680px",
      minWidth: "480px",
      height: "800px",
      "& > img": {
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "left center",
        borderRadius: "12px",
      },
    },
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    alignItems: "center",
    "& > div": {
      "& > .image": {
        display: "none",
      },
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& > div": {
      "& > .container": {
        maxWidth: "400px",
        "& h2": {
          font: theme.font.lg,
        },
        "& p": {
          font: theme.font.xs,
        },
      },
    },
  },
}));

const TopBooksContainer = styled(Box)(({ theme }) => ({
  padding: "120px 0",
  "& > .header": {
    maxWidth: "1400px",
    margin: "0 auto 80px auto",
    padding: "0px 20px",
    "& > h2": {
      color: theme.palette.secondary.main,
      font: theme.font.xl,
      maxWidth: "1040px",
      "& > span": {
        font: "inherit",
        color: theme.palette.primary[700],
      },
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& > .header > h2": {
      font: theme.font.lg,
      maxWidth: "400px",
    },
  },
}));

const QuestionsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "40px",
  margin: "0 auto",
  padding: "120px 20px",
  maxWidth: "1400px",
  "& > .question-img > img": {
    display: "block",
    minWidth: "300px",
    maxWidth: "100%",
  },
  "& > .container": {
    maxWidth: "678px",
    "& > h2": {
      font: theme.font.xl,
      color: theme.palette.secondary.A200,
      marginBottom: "40px",
    },
    "& > p": {
      font: theme.font.md,
      color: theme.palette.secondary[800],
      "& > a": {
        color: theme.palette.primary[700],
        textDecoration: "none",
        fontWeight: 600,
      },
    },
    "& span": {
      font: "inherit",
      color: theme.palette.primary[700],
    },
  },
  [theme.breakpoints.down("md")]: {
    "& > .question-img": {
      display: "none",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& > .container": {
      "& > h2": {
        font: theme.font.lg,
      },
      "& > p": {
        font: theme.font.xs,
      },
      "& span": {
        font: "inherit",
      },
    },
  },
}));

export {
  IntroductionContainer,
  TopBooksContainer,
  CallToActionContainer,
  QuestionsContainer,
};
