import { Account } from "@/components/Icons";
import ChatItem from "./styles";
import { Text, TouchableHighlight, TouchableOpacity } from "react-native";
import Badge from "@/components/Badge";
import { useTheme } from "styled-components/native";
import { useContext, useState } from "react";
import Swipeable from "@/components/Swipeable";
import { IChat } from "@/types/Chat";
import { TimePast } from "@/helpers";
import { AuthContext } from "@/contexts/AuthContext";
import { Navigator, router } from "expo-router";

export default function Item(chat: IChat) {
  const theme = useTheme();
  const { user: userData } = useContext(AuthContext)!;

  function _onPressButton() {
    router.navigate(`chat/${chat.id}`);
  }
  return (
    <Swipeable actions={[{ name: "delete" }]} data={[]}>
      <TouchableHighlight onPress={_onPressButton}>
        <ChatItem.Container>
          <Account />
          <ChatItem.Center>
            <ChatItem.Username numberOfLines={1}>
              {chat.name || (chat.users.find((user) => user.id !== userData?.id)?.name as string)}{" "}
            </ChatItem.Username>
            <ChatItem.LastMessagePreview numberOfLines={1}>
              {chat.messages[0].content}
            </ChatItem.LastMessagePreview>
          </ChatItem.Center>
          <ChatItem.End>
            <Text style={{ textAlign: "center", fontSize: theme.typography.size.xxs }}>
              {TimePast(chat.updatedAt)}
            </Text>
            <Badge number={chat.unreaded_messages} />
          </ChatItem.End>
        </ChatItem.Container>
      </TouchableHighlight>
    </Swipeable>
  );
}
