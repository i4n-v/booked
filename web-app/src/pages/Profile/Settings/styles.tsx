import { Box, styled } from "@mui/material";
import { InputAreaItemProps, InputAreaProps } from "./types";

const InputArea = styled(Box)<InputAreaProps>(({ theme, cols }) => ({
  display: "grid",
  width: "100%",
  minHeight: "100%",
  gridTemplateColumns: `repeat(${cols},1fr)`,
  gridAutoRows: "minmax(min-content, max-content);",
  [theme.breakpoints?.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const InputAreaItem = styled(Box)<InputAreaItemProps>(
  ({ theme, span = 1 }) => ({
    width: "100%",
    gridColumn: `auto / span ${span}`,
    [theme.breakpoints?.down("md")]: {
      gridColumn: `auto / span 1`,
    },
  })
);

const ContentContainer = styled("form")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "grid",
  minHeight: "600px",
  rowGap: "40px",
}));

const ConfigContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  background: theme.palette.secondary["light"],
  borderRadius: "0px 6px 6px 0px",
  display: "grid",
  overflow: "hidden",
  gridTemplateColumns: "320px 1fr",
  [theme.breakpoints?.down("md")]: {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto",
    gridAutoRows: "1fr",
  },
}));

const ConfigMenu = styled(Box)(({ theme }) => ({
  width: "100%",
  background: theme.palette.secondary["main"],
  borderRadius: "6px 0px 0px 6px",
  [theme.breakpoints?.down("md")]: {
    height: "fit-content",
  },
}));

const ConfigContent = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "60px",
  maxWidth: "860px",
  margin: "0 auto",
}));

export {
  ConfigContainer,
  ConfigMenu,
  ConfigContent,
  InputAreaItem,
  InputArea,
  ContentContainer,
};
