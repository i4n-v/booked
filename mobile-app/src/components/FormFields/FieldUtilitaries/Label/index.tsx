import React from "react";
import { LabelRequirement, LabelText } from "./styles";
import { ILabelProps } from "./types";

export default function Label({ children, required, disabled, error }: ILabelProps) {
  if (!children) return null;

  return (
    <LabelText disabled={disabled} error={error}>
      {children}
      {required && <LabelRequirement>{" *"}</LabelRequirement>}
    </LabelText>
  );
}
