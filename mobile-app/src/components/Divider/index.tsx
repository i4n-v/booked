import React from "react";
import { IDividerProps } from "./types";
import { Divider } from "./styles";

export default function index({ orientation = "horizontal" }: IDividerProps) {
  return <Divider orientation={orientation} />;
}
