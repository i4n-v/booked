import { DropdownOptions } from "../../../../components/Dropdown/type";

export type MessageProps = {
  showAccount: boolean;
  response: boolean;
  content: string;
  id: string | number;
  actionsOptions: DropdownOptions[];
};
