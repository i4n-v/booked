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
                    <Description>Radio input component allows users to attach one or multiple files.</Description>
                    <Subtitle>See the examples and put them into practice:</Subtitle>
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
        opitons: {
            description: "",
            control: {
                type: "radio",
            },
            options: {
                'Option 1': 'Option 1',
                'Option 2': 'Option 2',
                'Option 3': 'Option 3',
            }
        },
        description: {
            description: "",
        },
        onChange: {
            description: "",
        },
    },
    args: {
        name: "Radio",
        options: "",
        description: "analise",
        onChange: ""
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
                optons={options}
                description={description}
                onChange={onChange}
            />
        </FormWrapper>
    ),
};