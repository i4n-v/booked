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

const Title = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.md + "px"};
  color: ${({ theme }) => theme.colors.text?.[1000]};
  max-width: 100%;
`;

export { HeaderContainer, Title };
