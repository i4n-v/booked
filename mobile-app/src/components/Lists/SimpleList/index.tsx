import React from "react";
import { Container, Item, ItemContainer, Orded, Unorded } from "./styles";
import { ISimpleList } from "./types";
import EmptyComponent from "@/components/EmptyComponent";

function SimpleList({
  data = [],
  customIcon,
  type = "unorded",
  emptyMessage = "Nenhum item encontrado.",
  itemStyle,
  containerStyle,
}: ISimpleList) {
  return (
    <Container style={containerStyle}>
      {data?.length > 0 ? (
        data.map((item, index) => {
          const icons = {
            unorded: <Unorded />,
            orded: <Orded>{`${index + 1}.`}</Orded>,
          };

          return (
            <ItemContainer key={index}>
              {customIcon || icons[type]}
              <Item style={itemStyle}>{item}</Item>
            </ItemContainer>
          );
        })
      ) : (
        <EmptyComponent emptyMessage={emptyMessage} />
      )}
    </Container>
  );
}

export default SimpleList;
