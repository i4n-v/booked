import { styled } from "@mui/material";
import { Box } from "@mui/system";

export const GroupFormContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "grid",
  alignItems: "center",
  rowGap: "30px",
  font: theme.font.sm,
  columnGap: "40px",
}));

export const UsersList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  background: theme.palette.primary[400],
  overflowY: "auto",
  maxHeight: "340px",
  minHeight: "340px",
  alignItems: "start",
}));

export const UsersListItem = styled(Box)<{ added?: boolean }>(
  ({ theme, added }) => ({
    display: "flex",
    alignItems: "center",
    columnGap: "10px",
    cursor: "pointer",
    padding: "15px 10px",
    width: "100%",
    background: added ? theme.palette.primary[500] : "",
    "&:hover": {
      background: theme.palette.primary[500],
    },
  })
);
