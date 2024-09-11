import React, { useContext } from "react";
import { HeaderContainer, UserInfo, UserName, Name, Detail } from "./styles";
import { IconButton } from "@/components/Buttons";
import { ArrowBack, Config } from "@/components/Icons";
import { useTheme } from "styled-components/native";
import { IUserHeaderProps } from "./types";
import limitName from "@/utils/limitName";
import { AuthContext } from "@/contexts/AuthContext";
import { router } from "expo-router";

export default function UserHeader({ data, onPress }: IUserHeaderProps) {
  const theme = useTheme();
  const { user } = useContext(AuthContext)!;
  const isLoggedUser = data.id === user?.id;

  return (
    <HeaderContainer>
      <UserInfo>
        {!isLoggedUser && (
          <IconButton<any>
            icon={<ArrowBack />}
            isFocused
            onPress={() => router.back()}
            style={{ marginRight: 16 }}
          />
        )}
        <Name>{limitName(data.name, 2)}</Name>
        <Detail colors={[theme.colors.primary?.[200]!, theme.colors.primary?.[400]!]} />
        <UserName>{data.user_name}</UserName>
      </UserInfo>
      {isLoggedUser && <IconButton<any> icon={<Config />} onPress={onPress} />}
    </HeaderContainer>
  );
}
