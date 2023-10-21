import React from "react";
import ListItems from "../../components/List";
import {
  Description,
  Subtitle,
  Title,
  Primary,
  Controls,
} from "@storybook/blocks";
import { Meta } from "@storybook/react";
import { IListItemProps } from "../../components/List/types";

const meta: Meta<IListItemProps> = {
  component: ListItems, // O componente que você deseja documentar
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            A list component for rendering and lists of items.
          </Description>
          <Subtitle>See the examples and put them into practice:</Subtitle>
          <Primary />
          <Controls />
        </>
      ),
    },
  },
  argTypes: {
    data: {
      description: "Array of list items",
      control: {
        type: "object",
      },
      defaultValue: [
        { text: "Item 1" },
        { text: "Item 2" },
        { text: "Item 3" },
      ],
    },
    handleChange: {
      description: "Function to handle item change",
      control: {
        type: "function",
      },
    },
  },
  args: {
    data: [{ text: "Item 1" }, { text: "Item 2" }, { text: "Item 3" }],
  },
};
export default meta;

export const Default = () => (
  <ListItems
    data={[{ text: "Item 1" }, { text: "Item 2" }, { text: "Item 3" }]}
    handleChange={(index) => console.log(`Item ${index} selecionado`)}
  />
);
