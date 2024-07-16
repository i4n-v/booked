import styled from "styled-components/native";

interface ILoadingContainerProps {
  opacity: number;
}

const LoadingContainer = styled.View<ILoadingContainerProps>`
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  position: "absolute";
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000000;
  opacity: ${({ opacity }) => opacity};
`;

const LoadingMessage = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.semibold};
  font-size: ${({ theme }) => theme.typography.size.body + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[700]};
  margin-top: 4px;
`;

export { LoadingContainer, LoadingMessage };
