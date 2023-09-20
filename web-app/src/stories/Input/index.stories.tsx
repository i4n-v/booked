import type { Meta, StoryObj } from "@storybook/react";
import Input from "../../components/Input";
import { InputProps } from "../../components/Input/types";
import {
  Description,
  Subtitle,
  Title,
  Primary,
  Controls,
} from "@storybook/blocks";
import { FormProvider, useForm } from "react-hook-form";
import FormWrapperProps from "./types";

const meta: Meta<InputProps> = {
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>Input componet</Description>
          <Subtitle>See the examples</Subtitle>
          <Primary />
          <Controls />
        </>
      ),
    },
  },
  argTypes: {
    name: {
      description: "",
    },
    label: {
      description: "",
    },
    type: {
      description: "",
    },
    icon: {
      description: "",
    },
    shrink: {
      description: "",
    },
  },
  args: {
    name: "livro",
    label: "nome do livro",
    type: "text",
    shrink: true,
  },
};

export default meta;
type Story = StoryObj<InputProps>;

const FormWrapper = ({ children }: FormWrapperProps) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const Default: Story = {
  render: ({ name, label, type, shrink }: InputProps) => (
    <FormWrapper>
      <Input name={name} label={label} type={type} shrink={shrink} />
    </FormWrapper>
  ),
};
