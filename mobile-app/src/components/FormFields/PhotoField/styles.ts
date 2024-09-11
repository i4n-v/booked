import styled from "styled-components/native";

interface StyledWithDisabled {
  disabled?: boolean;
}

const FieldContainer = styled.View`
  gap: 12px;
  align-items: center;
`;

const UnknownPhoto = styled.View<StyledWithDisabled>`
  width: 140px;
  height: 140px;
  border-radius: 140px;
  border-width: 1.25px;
  border-color: ${({ theme }) => theme.colors.primary?.[200]};
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled, theme }) => (disabled ? theme.shape.opacity : 1)};
  ${({ theme }) => theme.shadows[0] as any}
  `;

const Photo = styled.Image<StyledWithDisabled>`
  width: 140px;
  height: 140px;
  border-radius: 140px;
  border-width: 1px;
  opacity: ${({ disabled, theme }) => (disabled ? theme.shape.opacity : 1)};
  border-color: ${({ theme }) => theme.colors.secondary?.[100]};
  ${({ theme }) => theme.shadows[0] as any}
`;

export { FieldContainer, UnknownPhoto, Photo };
