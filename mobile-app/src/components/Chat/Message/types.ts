import { IMessage } from "@/types/Message";
import { GestureResponderEvent } from "react-native";

export interface MessageContentProps {
  mine?: boolean;
}

export interface MessageProps extends IMessage {
  onPressImage: (((event: GestureResponderEvent) => void) & (() => void)) | undefined;
}
