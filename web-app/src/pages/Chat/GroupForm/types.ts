import { IChat } from "../../../services/useChat/types";

export interface GroupFormProps {
  handleClose: () => void;
  isEdit: boolean;
  selectedChat?: IChat;
}
