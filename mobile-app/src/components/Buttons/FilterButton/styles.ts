import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const ButtonContainer = styled(TouchableOpacity)`
  position: absolute;
  bottom: 124px;
  right: 16px;
  z-index: 1;
  ${({ theme }) => theme.shadows[0] as any};
`;

const ButtonGradient = styled(LinearGradient)`
  padding: 12px;
  border-radius: 100px;
`;

export { ButtonGradient, ButtonContainer };
