import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";

interface IIconButtonContainerProps {
  focused?: boolean;
  focusColor?: string;
  size: number;
}

const IconButtonContainer = styled(TouchableOpacity)<IIconButtonContainerProps>`
  border-radius: 100px;
  background-color: ${({ theme, focused, focusColor }) => {
    if (focused) {
      return focusColor ? focusColor : theme.colors.secondary?.[200];
    }

    return "transparent";
  }};
  padding: ${({ size }) => size * 0.3 + "px"};
`;

export { IconButtonContainer };
