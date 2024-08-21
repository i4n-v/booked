import React, { useCallback, useState } from "react";
import { IconButtonContainer } from "./styles";
import { IIconButtonProps } from "./types";
import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";

export default function IconButton<T extends ExpoVectorIcon>({
  icon,
  name,
  color,
  size = 24,
  activeOpacity = 0.7,
  style,
  disabled,
  focusColor,
  isFocused,
  onPress,
}: IIconButtonProps<T>) {
  const [focused, setFocused] = useState(false);

  const toggleFocus = useCallback(() => {
    if (onPress) setFocused((focused) => !focused);
  }, []);

  const Icon = icon as any;

  const isIcon = useCallback((value: any): value is ExpoVectorIcon => {
    return !!value && !!name;
  }, []);

  return (
    <IconButtonContainer
      size={size}
      focused={focused || isFocused}
      focusColor={focusColor}
      style={style}
      onPressIn={toggleFocus}
      onPressOut={toggleFocus}
      onPress={onPress}
      activeOpacity={activeOpacity}
      disabled={disabled}
    >
      {isIcon(Icon) ? <Icon name={name} color={color} size={size} /> : Icon}
    </IconButtonContainer>
  );
}
