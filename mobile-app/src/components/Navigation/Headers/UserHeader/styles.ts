import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import styled from "styled-components/native";

const HeaderContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0px 16px;
  height: 64px;
  margin-top: 50px;
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  ${({ theme }) => theme.shadows[0] as any};
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const Detail = styled(LinearGradient)`
  width: 4px;
  height: 4px;
  border-radius: 4px;
`;

const Name = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.xs + "px"};
  color: ${({ theme }) => theme.colors.text?.[1000]};
`;

const UserName = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.xs + "px"};
  color: ${({ theme }) => theme.colors.text?.[700]};
`;

export { HeaderContainer, UserInfo, Name, UserName, Detail };
