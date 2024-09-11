import styled from "styled-components/native";

const FormContainer = styled.View`
  padding: 28px 16px;
  gap: 20px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.secondary?.[300]};
  margin: 16px -16px;
`;

export { FormContainer, Divider };
