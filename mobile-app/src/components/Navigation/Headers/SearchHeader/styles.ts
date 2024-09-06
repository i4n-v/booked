import { View } from "react-native";
import styled from "styled-components/native";

const HeaderContainer = styled(View)`
  justify-content: center;
  padding: 0px 16px;
  height: 64px;
  margin-top: 50px;
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  ${({ theme }) => theme.shadows[0] as any};
`;

const Wrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export { HeaderContainer, Wrapper };
