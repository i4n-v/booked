import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  /* padding: 10px 0; */
  background-color: ${({ theme }) => theme.colors.secondary?.[50]};
`;

export const TabList = styled.View`
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 25px;
  position: relative;
  padding: 10px;
 /*  background-color: ${({ theme }) => theme.colors.secondary?.[500]}; */
`;

export const Text = styled.Text`

  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.xs + "px"};
  color: ${({ theme }) => theme.colors.text?.[1000]};
`;

export const Selection = styled.View`
  position: absolute;
  bottom: 0;
  height: 3px;
  width: 100px;
  background-color: ${({ theme }) => theme.colors.primary?.[200]};
  border-radius: 5px;
`;

export const Dot = styled.View`
  width: 5px;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.primary?.[200]};
  border-radius: 50px;
`;
