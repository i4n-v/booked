import React, { useState } from "react";
import Dropdown from "../../components/Dropdown";
import {
  Description,
  Subtitle,
  Title,
  Primary,
  Controls,
} from "@storybook/blocks";
import { MoreVert } from "@mui/icons-material";
import { Meta } from "@storybook/react";
import { DropdownProps } from "../../components/Dropdown/type";

const meta: Meta<DropdownProps> = {
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description></Description>
          <Subtitle>See the examples and put them into practice:</Subtitle>
          <Primary />
          <Controls />
        </>
      ),
    },
    argTypes: {
      anchorId: {
        control: "text",
        description: "The ID of the anchor element that triggers the dropdown.",
      },
      open: {
        control: "boolean",
        description: "Determines whether the dropdown is open or closed.",
      },
      options: {
        control: "object",
        description: "An array of options to display in the dropdown.",
      },
      minWidth: {
        control: "text",
        description: "The minimum width of the dropdown menu.",
      },
    },
  },
};
export default meta;

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "Option 1", handler: () => alert("Option 1 clicked") },
    { label: "Option 2", handler: () => alert("Option 2 clicked") },
  ];

  return (
    <div style={{ position: "relative" }}>
      <button id="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        <MoreVert />
      </button>
      <Dropdown
        anchorId="dropdown-button"
        open={isOpen}
        handleClose={() => setIsOpen(false)}
        options={options}
        minWidth="360px"
      />
    </div>
  );
};
