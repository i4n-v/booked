import styled from "styled-components/native";

const ReaderContainer = styled.View`
  flex: 1;
  position: relative;
`;

const ToolsContainer = styled.View`
  position: absolute;
  width: 100%;
  gap: 28px;
  bottom: 0;
  left: 0;
  padding: 20px 16px;
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
`;

const InfoTools = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Counter = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.sm + "px"};
  color: ${({ theme }) => theme.colors.secondary?.[1000]};
`;

const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.sm + "px"};
  color: ${({ theme, disabled }) => (disabled ? theme.colors.secondary?.[500] : theme.colors.primary?.[200])};
`;

const BookMarkContainer = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
`;

export { ReaderContainer, ToolsContainer, Counter, ButtonText, InfoTools, BookMarkContainer };
