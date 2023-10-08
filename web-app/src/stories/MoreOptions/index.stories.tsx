import React, { useState } from "react";
import ListItems from "../../components/List";
import { MoreOptionsProps } from "../../components/MoreOptions/types";
import {
  Description,
  Subtitle,
  Title,
  Primary,
  Controls,
} from "@storybook/blocks";
import { Meta } from "@storybook/react";
import { IListItemProps } from "../../components/List/types";
import MoreOptions from "../../components/MoreOptions";

const meta: Meta<MoreOptionsProps> = {
  component: MoreOptions, // O componente que você deseja documentar
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>MoreOptions Component Documentation</Description>
          <Subtitle>See the examples and put them into practice:</Subtitle>
          <Primary />
          <Controls />
        </>
      ),
    },
  },
  argTypes: {
    options: {
      description: "Array of options to be displayed in the drop-down menu.",
      control: {
        type: "object",
      },
    },
    open: {
      control: "boolean",
      description: "Defines whether the dropdown is open or closed.",
    },
    id: {
      control: "text",
      description:
        "The unique identifier for the button that opens the dropdown.",
    },
    handleOpen: {
      description:
        "A function that controls the open state of the drop-down menu.",
    },
  },
  args: {},
};
export default meta;

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "Option 1", handler: () => alert("Option 1 clicked") },
    { label: "Option 2", handler: () => alert("Option 2 clicked") },
    { label: "Option 3", handler: () => alert("Option 3 clicked") },
    { label: "Option 4", handler: () => alert("Option 4 clicked") },
    { label: "Option 5", handler: () => alert("Option 5 clicked") },
  ];

  return (
    <MoreOptions
      open={isOpen}
      handleOpen={setIsOpen}
      options={options}
      id="example-options"
    />
  );
};
