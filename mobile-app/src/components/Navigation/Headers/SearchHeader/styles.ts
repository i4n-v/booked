import { View } from "react-native";
import styled from "styled-components/native";
import Constants from "expo-constants";

const HeaderContainer = styled(View)`
  justify-content: center;
  padding: 0px 16px;
  height: 64px;
  margin-top: ${Constants.statusBarHeight};
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  ${({ theme }) => theme.shadows[0] as any};
`;

const Wrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const LogoContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export { HeaderContainer, Wrapper, LogoContainer };
