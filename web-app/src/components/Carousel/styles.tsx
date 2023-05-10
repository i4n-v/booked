import { Box, styled } from "@mui/material";

const CarouselContainer = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  maxWidth: "1920px",
  margin: "0 auto",
  transition: "0.5s",
  "& > div": {
    display: "flex",
    marginTop: "32px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    "& > button": {
      width: "16px",
      height: "16px",
      border: `2px solid ${theme.palette.primary[700]}`,
      borderRadius: "100%",
      cursor: "pointer",
      transition: "0.3s",
    },
    "& .activeTab": {
      background: `linear-gradient(180deg, ${theme.palette.primary[700]} 0%, ${theme.palette.primary[900]} 100%)`,
    },
  },
  "& > ul": {
    display: "flex",
    gap: "40px",
    padding: "0 20px",
    listStyle: "none",
    "&:hover": {
      willChange: "transform",
    },
    "& > li": {
      flexShrink: 0,
      maxWidth: "fit-content",
      opacity: 0.8,
      transform: "scale(0.9)",
      transition: "0.4s",
    },
  },
  "& .active": {
    opacity: 1,
    transform: "scale(1)",
  },
  [theme.breakpoints.down("sm")]: {
    "& > ul": {
      gap: "20px",
    },
    "& > div": {
      display: "flex",
    },
  },
}));

export { CarouselContainer };
