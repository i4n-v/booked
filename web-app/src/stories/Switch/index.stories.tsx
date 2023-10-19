import type { Meta, StoryObj } from "@storybook/react";
import Switch from "../../components/Input/Switch"
import { InputProps } from "../../components/Input/types";
import { FormProvider, useForm } from "react-hook-form";
import FormWrapperProps from "../Input/types";
import {
    Description,
    Subtitle,
    Title,
    Primary,
    Controls,
} from "@storybook/blocks";

const meta: Meta<InputProps> = {
    component: Switch,
    tags: ["autodocs"],
    parameters: {
      docs: {
        page: () => (
          <>
            <Title />
            <Description>It is an element where a user can switch between two states, allowing actions to be activated or deactivated based on their selection.</Description>
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
          type: "switch",
        },
    },
      icon: {
        description: "It includes an icon to help the user enter data.",
      },
      shrink: {
        description: "Property specifies how the item will shrink relative to the rest of the items.",
      },
    },
    args: {
      name: "Switch",
      label: "Label of Switch",
      type: "switch",
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
        <Switch 
        name={name} 
        label={label} 
        type={type} 
        shrink={shrink}
        />
      </FormWrapper>
    ),
  };
  