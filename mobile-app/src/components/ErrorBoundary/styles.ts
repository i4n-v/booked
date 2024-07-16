import { StyleSheet } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  padding-left: ${({ theme }) => theme.shape.padding + "px"};
  padding-right: ${({ theme }) => theme.shape.padding + "px"};
`;

const Container = styled.View`
  width: 100%;
  align-items: center;
`;

const AnimationContainer = styled.View`
  border-radius: 250px;
  width: 250px;
  height: 250px;
  overflow: hidden;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.semibold};
  font-size: ${({ theme }) => theme.typography.size.regular + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[700]};
  margin-bottom: 12px;
`;

const Message = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.body + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[600]};
  margin-bottom: 28px;
`;

const EmphasisMessage = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.semibold};
`;

const ErrorViewer = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.caption + "px"};
  color: ${({ theme }) => theme.colors.error?.[400]};
  background-color: ${({ theme }) => theme.colors.error?.[50]};
  margin-top: 38px;
  padding: ${({ theme }) => theme.shape.padding + "px"};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.error?.[100]};
  border-radius: ${({ theme }) => theme.shape.borderRadius + "px"};
`;

export { Wrapper, Container, AnimationContainer, Title, Message, EmphasisMessage, ErrorViewer };
