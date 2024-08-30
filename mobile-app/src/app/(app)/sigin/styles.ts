import { MainButton } from "@/components/Buttons";
import { BottomDetail, TopDetail } from "@/components/Icons";
import { Image, Text, View } from "react-native";
import styled from "styled-components/native";

const Wrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-right: ${({ theme }) => theme.shape.padding + "px"};
  padding-left: ${({ theme }) => theme.shape.padding + "px"};
`;

const Form = styled(View)`
  width: 100%;
  padding: 40px 20px;
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  border-radius: ${({ theme }) => theme.shape.borderRadius + "px"};
  gap: 20px;
`;

const Title = styled(Text)`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.lg + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[1000]};
  margin-bottom: 12px;
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

const PositionBottomDetail = styled(BottomDetail)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const PositionTopDetail = styled(TopDetail)`
  position: absolute;
  top: 0;
  left: 0;
`;

const Logo = styled(Image)`
  position: absolute;
  bottom: 12px;
  left: 12px;
`;

const Button = styled(MainButton)`
  margin: 12px 0 28px 0;
`;

export {
  Wrapper,
  Form,
  Title,
  DescriptionWrapper,
  Description,
  DescriptionDetail,
  PositionBottomDetail,
  PositionTopDetail,
  Logo,
  Button,
};
