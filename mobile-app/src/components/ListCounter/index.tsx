import React from "react";
import { CounterContainer, Description, Detail, Title } from "./styles";
import { ICounterProps } from "./types";

export default function ListCounter({ title, count, total }: ICounterProps) {
  return (
    <CounterContainer>
      {title && <Title>{title}</Title>}
      <Description>
        Exibindo <Detail>{count}</Detail> de <Detail>{total}</Detail>
      </Description>
    </CounterContainer>
  );
}
