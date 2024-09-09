import { Account } from "@/components/Icons";
import ChatItem from "./styles";
import { Text, TouchableHighlight } from "react-native";
import Badge from "@/components/Badge";
import { useTheme } from "styled-components/native";
import { useContext } from "react";
import { IChat } from "@/types/Chat";
import { TimePast } from "@/helpers";
import { AuthContext } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { UserPhoto } from "@/components/Cards/UserCard/styles";
import Group from "@/components/Icons/Group";

export default function Item(chat: IChat) {
  const theme = useTheme();
  const { user: userData } = useContext(AuthContext)!;

  const receiver = chat.users.find((user) => user.id !== userData?.id);
  function _onPressButton() {
    router.navigate({ pathname: "/(app)/(stack)/chat/[id]", params: { id: chat?.id! } });
  }
  return (
      <TouchableHighlight onPress={_onPressButton}>
        <ChatItem.Container>
          {chat.name ? <Group width={42} height={42} /> : receiver?.photo_url ? (
            <UserPhoto source={{ uri: receiver.photo_url }} resizeMode="cover" />
          ) : (
            <Account width={42} height={42} />
          )}
          <ChatItem.Center>
            <ChatItem.Username numberOfLines={1}>
              {chat.name || (chat.users.find((user) => user.id !== userData?.id)?.name as string)}{" "}
            </ChatItem.Username>
            <ChatItem.LastMessagePreview numberOfLines={1}>
              {chat.messages[0]?.content}
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
  );
}
