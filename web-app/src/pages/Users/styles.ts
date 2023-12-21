import { Box, styled } from "@mui/material";

export const Actions = styled(Box)<{ showfilters: "true" | undefined }>(
  ({ showfilters }) => ({
    "& > div:first-of-type": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& form:first-of-type": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "20px",
      visibility: !!showfilters ? "visible" : "hidden",
      opacity: !!showfilters ? 1 : 0,
      height: !!showfilters ? "auto" : 0,
      transition: "opacity 1s linear",
    },
    minHeight: "56px",
    display: "grid",
    rowGap: "28px",
  })
);

export const UsersCardsContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(376px, auto))",
  columnGap: "16px",
  paddingTop: "40px",
  justifyContent: "space-evelyn",
  rowGap: "40px",
}));

export const UsersContainer = styled(Box)(({ theme }) => ({
  minHeight: "960px",
  display: "flex",
  flexDirection: "column",
}));
