import { View } from "react-native";
import styled from "styled-components/native";

const Container = styled(View)`
  width: 100%;
  padding-right: ${({ theme }) => theme.shape.padding + "px"};
  padding-left: ${({ theme }) => theme.shape.padding + "px"};
  position: absolute;
  bottom: ${({ theme }) => theme.shape.padding + "px"};
`;

const TabList = styled(View)`
  position: relative;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  width: 100%;
  border-radius: ${({ theme }) => theme.shape.borderRadius + "px"};
  background-color: ${({ theme }) => theme.colors.secondary?.[50]};
  ${({ theme }) => theme.shadows[0] as any}
`;

const Selection = styled.View`
  width: 52px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.primary?.[200]};
  border-radius: 4px;
  position: absolute;
  bottom: 0;
`;

export { Container, TabList, Selection };
