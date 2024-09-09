import { Account } from "@/components/Icons";
import UserListItem from "./styles";
import {  TouchableHighlight } from "react-native";
import { router } from "expo-router";
import { UserPhoto } from "@/components/Cards/UserCard/styles";
import { UserItemProps } from "./types";

export default function UserItem(user: UserItemProps) {
  function _onPressButton() {
    if(user.customOnPress) {
      user.customOnPress()
      return
    }
    const idToPath = user.chats?.[0]?.id || user.id
    router.navigate({pathname: "/(app)/(stack)/chat/[id]", params: {id: idToPath}});
  }
  return (
    <TouchableHighlight onPress={_onPressButton}>
      <UserListItem.Container active={user.active}>
      { user.photo_url ? <UserPhoto source={{ uri: user.photo_url }} resizeMode="cover" /> : <Account width={42} height={42} />}
        <UserListItem.Center>
          <UserListItem.Username numberOfLines={1}>{user.name}</UserListItem.Username>
        </UserListItem.Center>
      </UserListItem.Container>
    </TouchableHighlight>
  );
}
