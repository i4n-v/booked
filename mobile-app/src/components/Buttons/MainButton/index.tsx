import React, { useMemo } from "react";
import { useTheme } from "styled-components/native";
import Icon from "../../Icon";
import { ButtonContainer, ButtonGradient, ButtonLabel } from "./styles";
import { SpinnerLoading } from "../../Loading";
import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";
import { IMainButtonProps } from "./types";

function MainButton<L extends ExpoVectorIcon, R extends ExpoVectorIcon = L>({
  children,
  loading,
  loadingText = "enviando",
  disabled,
  onPress,
  colorScheme,
  leftIcon,
  rightIcon,
  style,
  gradientStyle,
  textStyle,
  variant,
  ...props
}: IMainButtonProps<L, R>) {
  const theme = useTheme();

  const { color, gradientColors } = useMemo(() => {
    let color = theme.colors.secondary?.[0];
    let gradientColors = [theme.colors.primary?.[200]!, theme.colors.primary?.[400]!];

    if (colorScheme) {
      gradientColors = [theme.colors[colorScheme]?.[500]!, theme.colors[colorScheme]?.[700]!];
    }

    if (variant === "outlined") {
      gradientColors = ["transparent", "transparent"];

      if (colorScheme) {
        color = theme.colors[colorScheme]?.[500];
      } else {
        color = theme.colors.secondary?.[700];
      }
    }

    return { color, gradientColors };
  }, [colorScheme, variant]);

  return (
    <ButtonContainer
      disabled={loading || disabled}
      onPress={onPress}
      activeOpacity={0.7}
      colorScheme={colorScheme}
      variant={variant}
      style={style}
      {...props}
    >
      <ButtonGradient colors={gradientColors} style={gradientStyle}>
        {!loading && leftIcon && (
          <Icon
            name={leftIcon.name}
            icon={leftIcon.icon}
            color={leftIcon.color || theme.colors.primary?.[200]}
            size={leftIcon.size || 36}
          />
        )}
        {(loading || children) && (
          <ButtonLabel color={color} style={textStyle}>
            {loading ? loadingText : children}
          </ButtonLabel>
        )}
        {!loading && rightIcon && (
          <Icon
            name={rightIcon.name}
            icon={rightIcon.icon}
            color={rightIcon.color || theme.colors.primary?.[200]}
            size={rightIcon.size || 36}
          />
        )}

        {loading && <SpinnerLoading color={color} size={28} />}
      </ButtonGradient>
    </ButtonContainer>
  );
}

export default MainButton;
