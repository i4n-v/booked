import React from "react";
import { HeaderContainer, Title } from "./styles";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { IconButton } from "@/components/Buttons";
import { ArrowBack } from "@/components/Icons";

export default function StackHeader({ navigation, options }: NativeStackHeaderProps) {
  const canGoBack = navigation.canGoBack();

  return (
    <HeaderContainer>
      {canGoBack && (
        <IconButton<any> icon={<ArrowBack />} isFocused onPress={() => navigation.goBack()} />
      )}
      <Title>{options.title}</Title>
    </HeaderContainer>
  );
}
