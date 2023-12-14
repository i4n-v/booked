import type { Meta, StoryObj } from "@storybook/react";
import File from "../../components/Input/File";
import { InputFileProps } from "../../components/Input/File/types";
import { FormProvider, useForm } from "react-hook-form";
import {
  Description,
  Subtitle,
  Title,
  Primary,
  Controls,
} from "@storybook/blocks";
import FormWrapperProps from "../Input/types";

const meta: Meta<InputFileProps> = {
  component: File,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            File input component allows users to attach one or multiple files.
          </Description>
          <Subtitle>See the examples and put them into practice:</Subtitle>
          <Primary />
          <Controls />
        </>
      ),
    },
  },
  argTypes: {
    name: {
      description: "Specifies the name of an element.",
    },
    button: {
      description: "Button for file uploads.",
    },
    accept: {
      description:
        "The accept attribute specifies a filter for what file types the user can pick from the file input dialog box.",
    },
    label: {
      description: "Represents a legend for an item.",
    },
  },
  args: {
    name: "File",
    button: true,
    accept: ".png, .jpg, .jpeg",
    label: "Label of Input",
  },
};

export default meta;
type Story = StoryObj<InputFileProps>;

const FormWrapper = ({ children }: FormWrapperProps) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const Default: Story = {
  render: ({ name, button, accept, label }: InputFileProps) => (
    <FormWrapper>
      <File name={name} button={button} accept={accept} label={label} />
    </FormWrapper>
  ),
};
