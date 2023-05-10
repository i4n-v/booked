import { ListItemProps, SxProps, Theme } from "@mui/material";

type ListData = {
  text: string;
  icon?: JSX.Element;
};

export interface IListItemProps {
  data: ListData[];
  handleChange?: (i: number) => void;
}
