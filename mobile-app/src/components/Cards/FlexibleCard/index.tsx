import React from "react";
import { useTheme } from "styled-components/native";
import accessObjectByString from "../../../utils/accessObjectByString";
import { IconButton } from "../../Buttons";
import {
  ActionsContainer,
  CardContainer,
  CardIcon,
  CardTitle,
  Description,
  DescriptionLabel,
  IconContainer,
} from "./styles";
import { IFlexibleCardProps } from "./types";
import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";

function FlexibleCard<
  T extends Record<string, any>,
  I extends ExpoVectorIcon,
  AI extends ExpoVectorIcon = I,
>({
  data,
  title,
  descriptions = [],
  actions = [],
  icon,
  color,
  style,
  onPress,
}: IFlexibleCardProps<T, I, AI>) {
  const theme = useTheme();

  return (
    <CardContainer
      style={style}
      onPress={onPress}
      activeOpacity={onPress instanceof Function ? 0.2 : 1}
    >
      {title && (
        <CardTitle color={color} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </CardTitle>
      )}
      {icon && (
        <IconContainer color={color}>
          <CardIcon name={icon.name} size={42} icon={icon.as} color={theme.colors.secondary?.[0]} />
        </IconContainer>
      )}
      {descriptions.map(({ label, key, formatter, shouldRender = true }) => {
        if (!shouldRender) return null;

        return (
          <Description key={label}>
            <DescriptionLabel>{label}: </DescriptionLabel>
            {formatter instanceof Function
              ? formatter(accessObjectByString(data, key), data)
              : accessObjectByString(data, key)}
          </Description>
        );
      })}
      {actions.map(({ icon, iconName, handler, disabled, visible }) =>
        !visible || (visible instanceof Function && visible(data)) ? (
          <ActionsContainer key={iconName}>
            <IconButton
              name={iconName}
              icon={icon}
              color={theme.colors.secondary?.[0]}
              size={28}
              onPress={() => {
                if (handler instanceof Function) {
                  handler(data);
                }
              }}
              activeOpacity={handler instanceof Function ? 0.7 : 1}
              disabled={disabled instanceof Function ? disabled(data) : false}
              style={{ backgroundColor: color ?? theme.colors.primary?.[200] }}
            />
          </ActionsContainer>
        ) : null,
      )}
    </CardContainer>
  );
}

export default FlexibleCard;
