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
          <Description>Input component for forms that receive data from users.</Description>
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
    label: {
      description: "Represents a legend for an item.",
    },
    type: {
      description: "Specifies the type element to display.",
      control: {
        type: "select",
      },
      options: {
        'button': 'button',
        'checkbox': 'checkbox',
        'color': 'color',
        'date': 'date',
        'datetime-local': 'datetime-local',
        'email': 'email',
        'file': 'file',
        'hidden': 'hidden',
        'image': 'image',
        'month': 'month',
        'number': 'number',
        'password': 'password',
        'radio': 'radio',
        'range': 'range',
        'reset': 'reset',
        'search': 'search',
        'submit': 'submit',
        'tel': 'tek',
        'text': 'text',
        'time': 'time',
        'url': 'url',
        'week': 'week',
  },
  },
    icon: {
      description: "It includes an icon to help the user enter data.",
    },
    shrink: {
      description: "Property specifies how the item will shrink relative to the rest of the items.",
    },
    focused: {
      description: "Applied when an element receives focus, which can occur when the user selects the element.",
    },
    hiddenLabel: {
      description: "Boolean attribute that indicates whether an element is relevant or not.",
    },
    margin: {
      description: "Defines the margin area on all four sides of the element.",
    },
    ref: {
      description: "Provide a way to access DOM or React elements.",
    },
  },
  args: {
    name: "Input",
    label: "Label of Input",
    type: "",
    shrink: true,
    focused: false,
    hiddenLabel: true,
    margin: "none",
  },
};

export default meta;
type Story = StoryObj<InputProps>;

const FormWrapper = ({ children }: FormWrapperProps) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const Default: Story = {
  render: ({ name, label, type, shrink, focused, hiddenLabel, margin, ref }: InputProps) => (
    <FormWrapper>
      <Input 
      name={name} 
      label={label} 
      type={type} 
      shrink={shrink}
      focused={focused}
      hiddenLabel={hiddenLabel}
      margin={margin}
      ref={ref}
      />
    </FormWrapper>
  ),
};
