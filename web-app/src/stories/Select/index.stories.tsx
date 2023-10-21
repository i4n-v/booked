import type { Meta, StoryObj } from "@storybook/react";
import Select from "../../components/Input/Select";
import { InputSelectProps } from "../../components/Input/Select/type";
import {
  Description,
  Subtitle,
  Title,
  Primary,
  Controls,
} from "@storybook/blocks";
import SelectOptions from "./types";
import { FormProvider, useForm } from "react-hook-form";
import FormWrapperProps from "../Input/types";

const meta: Meta<InputSelectProps<SelectOptions>> = {
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            The select element is used to create a drop-down list.
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
    optionLabel: {
      description: "Defines the value of an option.",
    },
    label: {
      description: "Represents a legend for an item.",
    },
    multiple: {
      description: "Specifies that the user is allowed to enter more than one value in the element.",
    },
    service: {
      description: "Is an optional attribute, used to search the server for options and dynamically populate the select element with the results.",
    },
  },
  args: {
    name: "Select",
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
    optionLabel: "label",
    label: "Select label",
    multiple: false,
  },
};

export default meta;
type Story = StoryObj<InputSelectProps<SelectOptions>>;

const FormWrapper = ({ children }: FormWrapperProps) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const Default: Story = {
  render: ({ name, optionLabel, label, multiple = false, options }) => (
    <FormWrapper>
      <Select
        name={name}
        optionLabel={optionLabel}
        label={label}
        multiple={multiple}
        options={options}
      />
    </FormWrapper>
  ),
};
