import { ComponentMeta } from "@storybook/react";
import React from "react";

import TextArea, { TextAreaProps } from "../TextArea";

export default {
    title: "OpenComponents/Components/TextArea",
    component: TextArea,
    decorators: [
        (Story) => (
            <div style={{ margin: "3em auto", maxWidth: "400px", textAlign: "center" }}>
                {Story()}
            </div>
        ),
    ],
    argTypes: {
        maxLength: {
            name: "maxLength",
            description: "Max character length of the input field",
            type: {
                name: "number",
                required: false,
                summary: "number",
            },
        },
        innerRef: {
            name: "innerRef",
            description: "A ref forward to the inner input",
            type: {
                name: "other",
                value: "reactref",
                summary: "React Ref",
                required: false,
            },
        },
        placeholder: {
            name: "placeholder",
            description: "Placeholder text for the input",
            type: {
                name: "string",
                summary: "string",
                required: false,
            },
        },
        value: {
            name: "value",
            description:
                "The current value of the input, only required outside of a opencomponents Form",
            type: {
                name: "string",
                summary: "string",
                required: true,
            },
        },
        onChange: {
            name: "onChange",
            description:
                "The onChange callback that gets called when the value of the input changes",
            type: {
                name: "function",
                required: true,
                summary: "(value: string) => void",
            },
            control: false,
        },
        name: {
            name: "name",
            description: `The name of the input in a form, also determines the property name in the
            forms output object, only required in that context`,
            type: {
                name: "string",
                required: true,
                summary: "string",
            },
        },
    },
} as ComponentMeta<typeof TextArea>;

export const simple = (args: TextAreaProps) => (
    <TextArea placeholder="Enter some text..." {...args} />
);
