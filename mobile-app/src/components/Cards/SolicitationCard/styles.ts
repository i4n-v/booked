import SolicitationBadge from "@/components/Icons/SolicitationBadge";
import styled, { css } from "styled-components/native";

const CardContainer = styled.View`
 flex-direction: row;
 padding: 16px;
 background-color: ${({ theme }) => theme.colors.secondary?.[0]};
 border-radius: 8px; ${({ theme }) => theme.shadows[0] as any}
 margin: 0px 16px 14px 16px ;
`;

const InfoContainer = styled.View`
 flex: 1;
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

export { CardContainer, InfoContainer, Text, StatusText, PositionSolicitationBadge };
