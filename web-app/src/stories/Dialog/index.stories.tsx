import Page from "../../components/Dialog";
import { Meta, StoryObj } from "@storybook/react";
import {
  Description,
  Subtitle,
  Title,
  Primary,
  Controls,
} from "@storybook/blocks";
import { iBookedDialog } from "../../components/Dialog/types";

const meta: Meta<iBookedDialog> = {
  component: Page,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>Dialog</Description>
          <Subtitle>See the examples and put them into practice:</Subtitle>
          <Primary />
          <Controls />
        </>
      ),
    },
  },
  argTypes: {
    onClose: {
      control: { type: "function" },
      description:
        "Function to handle the dialog close event. It can be a callback function triggered when the dialog is closed.",
    },
    height: {
      control: { type: "text" },
      description: "The height of the dialog. ",
    },
    width: {
      control: { type: "text" },
      description: "The width of the dialog. ",
    },
    minWidth: {
      control: { type: "text" },
      description: "The minimum width of the dialog. ",
    },
    minHeight: {
      control: { type: "text" },
      description: "The minimum height of the dialog.",
    },
  },
  args: {
    onClose: () => {},
    height: "300px",
    width: "700px",
    open: true,
  },
};
export default meta;

type Story = StoryObj<iBookedDialog>;

export const Default: Story = {
  render: ({ onClose, height, width, minWidth, minHeight, open }) => (
    <Page
      onClose={onClose}
      height={height}
      width={width}
      minWidth={minWidth}
      minHeight={minHeight}
      open={open}
    />
  ),
};
