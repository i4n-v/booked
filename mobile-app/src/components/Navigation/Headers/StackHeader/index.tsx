import React from "react";
import { HeaderContainer, Title } from "./styles";
import { IconButton } from "@/components/Buttons";
import { ArrowBack, More } from "@/components/Icons";
import { IStackHeaderProps } from "./types";

export default function StackHeader({ navigation, options }: IStackHeaderProps) {
  const canGoBack = navigation.canGoBack();

  return (
    <HeaderContainer>
      {canGoBack && (
        <IconButton<any> icon={<ArrowBack />} isFocused onPress={() => navigation.goBack()} />
      )}
      <Title numberOfLines={1} ellipsizeMode="tail">
        {options.title}
      </Title>

      {options.handleMorePress && (
        <IconButton<any>
          icon={<IconButton<any> icon={<More />} />}
          onPress={options.handleMorePress}
        />
      )}
    </HeaderContainer>
  );
}
