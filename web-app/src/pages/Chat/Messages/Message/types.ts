import IBook from "../../../../commons/IBook";
import { DropdownOptions } from "../../../../components/Dropdown/type";

export type MessageProps = {
  showAccount: boolean;
  response: boolean;
  books?: IBook[];
  content: string;
  id: string | number;
  actionsOptions: DropdownOptions[];
  photo: string;
  username?: string;
  profile_photo?: string;
};
