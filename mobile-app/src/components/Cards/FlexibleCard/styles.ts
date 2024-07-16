import styled from "styled-components/native";
import { IFlexibleCardProps } from "./types";
import Icon from "@/components/Icon";

type ICommonProps = Pick<IFlexibleCardProps<any, any>, "color">;

const CardContainer = styled.TouchableOpacity`
  position: relative;
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  padding: 20px 12px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.secondary?.[100]};
  box-shadow: ${({ theme }) => theme.shadows[1].web};
  row-gap: 2px;
`;

const ActionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.secondary?.[200]};
  padding-top: 12px;
  margin-top: 12px;
`;

const CardTitle = styled.Text<ICommonProps>`
  font-family: ${({ theme }) => theme.typography.fonts.primary.semibold};
  font-size: ${({ theme }) => theme.typography.size.regular + "px"};
  margin-right: 80px;
  margin-bottom: 6;
  color: ${({ theme, color }) => color ?? theme.colors.primary?.[200]};
`;

const IconContainer = styled.View<ICommonProps>`
  position: absolute;
  right: 0;
  top: 0;
  width: 80px;
  height: 70px;
  border-radius: 0 12px 0px 100px;
  background-color: ${({ theme, color }) => color ?? theme.colors.primary?.[200]};
`;

const CardIcon = styled(Icon)`
  position: absolute;
  top: 8px;
  right: 12px;
`;

const Description = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.body};
  color: ${({ theme }) => theme.colors.text?.[600]};
  flex: 1;
`;

const DescriptionLabel = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.semibold};
`;

export {
  CardContainer,
  CardTitle,
  IconContainer,
  CardIcon,
  Description,
  DescriptionLabel,
  ActionsContainer,
};
