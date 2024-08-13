import { Link as ExpoLink } from "expo-router";
import { Text, TouchableHighlight, View } from "react-native";
import styled from "styled-components/native";

const Wrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-right: ${({ theme }) => theme.shape.padding + "px"};
  padding-left: ${({ theme }) => theme.shape.padding + "px"};
`;

const Form = styled(View)`
  width: 100%;
  padding: 40px 20px;
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  border-radius: ${({ theme }) => theme.shape.borderRadius + "px"};
  gap: 24px;
`;

const Title = styled(Text)`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.lg + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[1000]};
`;

const DescriptionWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 3px;
`;

const Description = styled(Text)`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.xs + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[700]};
`;

const DescriptionDetail = styled(Text)`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  color: ${({ theme }) => theme.colors.primary?.[200]};
`;

export { Wrapper, Form, Title, DescriptionWrapper, Description, DescriptionDetail };
