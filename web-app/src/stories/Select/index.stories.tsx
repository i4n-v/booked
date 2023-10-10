import type { Meta, StoryObj } from "@storybook/react";
import Select from "../../components/Input/Select";
import { InputSelectProps } from "../../components/Input/Select/type";
import { FormProvider, useForm } from "react-hook-form";
import FormWrapperProps from "../Input/types";
import {
    Description,
    Subtitle,
    Title,
    Primary,
    Controls,
} from "@storybook/blocks";

const meta: Meta<InputSelectProps> = {
    component: Select,
    tags: ['autodocs'],
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
            description: "",
        },
        options: {
            description: "",
            control: {
                type: "select",
            },
            options: {
                'Option 1': 'Option 1',
                'Option 2': 'Option 2',
                'Option 3': 'Option 3',
            }
        },
        optionLabel: {
            description: "",
        },
        label: {
            description: "",
        },
        multiple: {
            description: "",
        },
        service: {
            description: "",
        },
    },
    args: {
        name: "Select",
        options: '',
        optionLabel: '',
        label: "Label of Select",
        multiple: true,
        service: '',
    },
};