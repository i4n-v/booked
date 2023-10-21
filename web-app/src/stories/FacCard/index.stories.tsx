import FaqCard from "../../components/FacCard";
import {
  Description,
  Subtitle,
  Title,
  Primary,
  Controls,
} from "@storybook/blocks";
import { Meta, StoryObj } from "@storybook/react";
import { FaqCardProps } from "../../components/FacCard/type";

const meta: Meta<FaqCardProps> = {
  component: FaqCard, // O componente que você deseja documentar
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            A card component for displaying questions and answers.
          </Description>
          <Subtitle>See the examples and put them into practice:</Subtitle>
          <Primary />
          <Controls />
        </>
      ),
    },
  },
  argTypes: {
    question: {
      control: "text",
      description: "The question displayed on the card.",
    },
    answer: {
      control: "text",
      description: "The answer to the question displayed on the card.",
    },
    color: {
      control: "color",
      description: "The highlight color for the card.",
    },
    open: {
      control: "boolean",
      defaultValue: false,
      description:
        "Determines whether the card should be initially open or closed.",
    },
  },
  args: {
    question: "Pergunta",
    answer: "Resposta",
    color: "#FFF",
    open: true,
  },
};
export default meta;

type Story = StoryObj<FaqCardProps>;

export const Default: Story = {
  render: ({ question, answer, color, open }) => (
    <FaqCard question={question} answer={answer} color={color} open={open} />
  ),
};
