import styled from "styled-components/native";

interface IIconContainerProps {
  length: number;
  disabled: boolean;
}

const ActionsContainer = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: -1000;
  justify-content: flex-end;
  flex-direction: row;
  border-radius: 12px;
`;

const SwipeableContainer = styled.View`
  position: relative;
`;

const IconContainer = styled.View<IIconContainerProps>`
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary?.[100]};
  height: 100%;
  width: 60px;
  border-color: ${({ theme }) => theme.colors.secondary?.[0]};
  border-right-width: 1px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export { SwipeableContainer, ActionsContainer, IconContainer };
