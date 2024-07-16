import React from "react";
import { IIconProps } from "./types";
import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";

export default function IconComponent<T extends ExpoVectorIcon>({
  icon,
  name,
  color,
  size = 2,
  style,
}: IIconProps<T>) {
  const Icon = icon as ExpoVectorIcon;

  if (!icon) return null;

  return <Icon name={name} color={color} size={size} style={style} />;
}
