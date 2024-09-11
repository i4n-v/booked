import styled, { css } from "styled-components/native";

const Text = styled.Text`
      fontSize: 14px;
      color: ${({ theme }) => theme.colors.text?.[1000]};
`;

export { Text };
