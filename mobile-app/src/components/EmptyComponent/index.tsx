import React from "react";
import { EmptyMessageContainer } from "./styles";
import { IEmptyComponentProps } from "./types";

function EmptyComponent({ emptyMessage }: IEmptyComponentProps) {
  return <EmptyMessageContainer>{emptyMessage || "Nenhum item encontrado"}</EmptyMessageContainer>;
}

export default EmptyComponent;
