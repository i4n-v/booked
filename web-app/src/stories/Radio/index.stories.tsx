import type { Meta, StoryObj } from "@storybook/react";
import Radio from "../../components/Input/Radio";
import { FormProvider, useForm } from "react-hook-form";
import FormWrapperProps from "../Input/types";
import {
  Description,
  Subtitle,
  Title,
  Primary,
  Controls,
} from "@storybook/blocks";

const meta: Meta = {
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            Radio input component allows users to attach one or multiple files.
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
    options: {
      description: "Defines an option in a select list.",
    },
    description: {
      description: "Represents a legend for an item.",
    },
    onChange: {
      description: "Used to perform a certain action after some change.",
    },
  },
  args: {
    name: "radio_button",
    options: [
      {
        label: "Option 1",
        value: 1,
      },
      {
        label: "Option 2",
        value: 2,
      },
      {
        label: "Option 3",
        value: 3,
      },
      {
        label: "Option 4",
        value: 4,
      },
      {
        label: "Option 5",
        value: 5,
      },
    ],
    description: "Radio field",
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<any>;

const FormWrapper = ({ children }: FormWrapperProps) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const Default: Story = {
  render: ({ name, options, description, onChange }: any) => (
    <FormWrapper>
      <Radio
        name={name}
        options={options}
        description={description}
        onChange={onChange}
      />
    </FormWrapper>
  ),
};
