import styled from "styled-components/native";

interface IIconContainerProps {
  index: number;
  length: number;
  color: string;
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
  background-color: ${({ color }) => color};
  height: 100%;
  width: ${({ index }) => (index === 0 ? "95px" : "80px")};
  border-color: ${({ theme }) => theme.colors.secondary?.[0]};
  border-right-width: 1px;
  border-top-right-radius: ${({ index, length }) => (index === length ? "12px" : 0)};
  border-bottom-right-radius: ${({ index, length }) => (index === length ? "12px" : 0)};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export { SwipeableContainer, ActionsContainer, IconContainer };
