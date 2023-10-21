import { Meta, StoryObj } from "@storybook/react";
import {
  Description,
  Subtitle,
  Title,
  Primary,
  Controls,
} from "@storybook/blocks";
import NavBar from "../../components/Layout/NavBar";
import { NavBarProps } from "../../components/Layout/NavBar/types";

const meta: Meta = {
  component: NavBar, // O componente que você deseja documentar
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
  },
  argTypes: {
    logged: {
      description: "Show user data if logged.",
      control: { type: "boolean" },
    },
  },
  args: {
    logged: false,
  },
};

export default meta;

type Story = StoryObj<NavBarProps>;

export const Default: Story = {
  render: ({ logged }) => <NavBar logged={logged} />,
};
