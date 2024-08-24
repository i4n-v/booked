import React from "react";
import { EmptyMessageContainer } from "./styles";
import { IEmptyComponentProps } from "./types";

function EmptyComponent({ emptyMessage, style }: IEmptyComponentProps) {
  return (
    <EmptyMessageContainer style={style}>
      {emptyMessage || "Nenhum item encontrado"}
    </EmptyMessageContainer>
  );
}

export default EmptyComponent;
