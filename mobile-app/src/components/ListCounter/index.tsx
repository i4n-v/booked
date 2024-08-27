import React from "react";
import { CounterContainer, Description, Detail, Title } from "./styles";
import { ICounterProps } from "./types";

export default function ListCounter({ title, page, limit, total }: ICounterProps) {
  return (
    <CounterContainer>
      {title && <Title>{title}</Title>}
      <Description>
        Exibindo <Detail>{page * limit}</Detail> de <Detail>{total}</Detail>
      </Description>
    </CounterContainer>
  );
}
