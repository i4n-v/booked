import React from "react";
import { HeaderContainer, Title } from "./styles";
import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { IconButton } from "@/components/Buttons";
import { ArrowBack } from "@/components/Icons";
import { ICustomSwipleableActions } from "@/components/Swipeable/types";
import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { Icon } from "@/components";
import { GestureResponderEvent, View } from "react-native";
interface CustomStackHeaderProps extends NativeStackHeaderProps {
  options: NativeStackNavigationOptions & { handleMorePress?(event: GestureResponderEvent): void};
}
export default function StackHeader({ navigation, options }: CustomStackHeaderProps) {
  const canGoBack = navigation.canGoBack();
  const theme = useTheme();
  const swipeActions: ICustomSwipleableActions<ExpoVectorIcon> = {
    more: {
      title: "mais",
      name: "more-vert",
      icon: MaterialIcons,
      color: theme.colors.primary?.[1100]!,
    },
  };

  return (
    <HeaderContainer>
      {canGoBack && (
        <IconButton<any> icon={<ArrowBack />} isFocused onPress={() => navigation.goBack()} />
      )}
      <Title>{options.title}</Title>

      {options.handleMorePress && (
        <IconButton<any>
          icon={
            <Icon
              icon={swipeActions["more"].icon}
              name={swipeActions["more"].name}
              color={theme.colors.primary?.[300]}
              size={24}
            />
          }
          onPress={options.handleMorePress}
        />
      )}
    </HeaderContainer>
  );
}
