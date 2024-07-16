import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";

interface IIconButtonContainerProps {
  focused: boolean;
  size: number;
}

const IconButtonContainer = styled(TouchableOpacity)<IIconButtonContainerProps>`
  border-radius: 100px;
  align-self: flex-start;
  background-color: ${({ theme, focused }) => (focused ? theme.colors.secondary?.[300] : "initial")};
  padding: ${({ size }) => size * 0.3 + "px"};
`;

export { IconButtonContainer };
