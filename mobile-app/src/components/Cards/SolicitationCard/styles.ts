import SolicitationBadge from "@/components/Icons/SolicitationBadge";
import styled, { css } from "styled-components/native";

const CardContainer = styled.View`
 flex-direction: row;
 padding: 16px;
 background-color: ${({ theme }) => theme.colors.secondary?.[0]};
 border-radius: 8px; ${({ theme }) => theme.shadows[0] as any}
 margin-bottom: 14px;
`;

const InfoContainer = styled.TouchableOpacity`
 flex: 1;
`;

const OptionButton = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : "white")};
`;

const Text = styled.Text`
 font-size: 14px;
 margin-bottom: 4px;
 font-weight: bold;
`;

const StatusText = styled.Text`
 font-weight: normal;
   color: ${({ theme }) => theme.colors.text?.[1000]};
`;

const PositionSolicitationBadge = styled(SolicitationBadge)`
  position: absolute;
  top: 0;
  right: 0;
`;

export { CardContainer, InfoContainer, Text, StatusText, PositionSolicitationBadge, OptionButton };
