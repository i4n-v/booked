import styled from "styled-components/native";
import { ILabelProps } from "./types";

const LabelText = styled.Text<Omit<ILabelProps, "required">>`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.xs + "px"};
  color: ${({ theme, error }) => (error ? theme.colors?.error?.[400] : theme.colors.text?.[700])};
  opacity: ${({ theme, disabled }) => (disabled ? theme.shape.opacity : 1)};
`;

const LabelRequirement = styled.Text<Omit<ILabelProps, "required">>`
  color: ${({ theme }) => theme.colors?.error?.[600]};
`;

export { LabelText, LabelRequirement };
