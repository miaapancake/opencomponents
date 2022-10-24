import { ComponentMeta } from "@storybook/react";
import React, { useState } from "react";

import NumberInput from "../NumberInput";

export default {
    title: "OpenComponents/Components/NumberInput",
    component: NumberInput,
    decorators: [
        (Story) => (
            <div style={{ margin: "3em auto", maxWidth: "400px", textAlign: "center" }}>
                {Story()}
            </div>
        ),
    ],
    argTypes: {
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
                name: "number",
                summary: "number",
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
                summary: "(value: number) => void",
            },
            control: false,
        },
        name: {
            name: "name",
            description: `The name of the input in a form, also determines 
            the property name in the forms output object, only required in that context`,
            type: {
                name: "string",
                required: true,
                summary: "string",
            },
        },
        min: {
            name: "min",
            description: "The minimum value of the input",
            type: {
                name: "number",
                summary: "number",
                required: false,
            },
        },
        max: {
            name: "max",
            description: "The maximum value of the input",
            type: {
                name: "number",
                summary: "number",
                required: false,
            },
        },
    },
} as ComponentMeta<typeof NumberInput>;

export const Simple = () => {
    const [value, setValue] = useState<number>(0);

    return <NumberInput placeholder="Please enter a number..." onChange={setValue} value={value} />;
};
