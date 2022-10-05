import { ComponentMeta } from "@storybook/react";
import React from "react";

import Button, { ButtonProps } from "../Button";

export default {
    title: "OpenComponents/Components/Button",
    component: Button,
    decorators: [(Story) => <div style={{ margin: "3em auto", maxWidth: "400px" }}>{Story()}</div>],
    argTypes: {
        value: {
            name: "value",
            description: "The current value of the slider",
            type: {
                name: "intersection",
                required: true,
                value: [{ name: "number" }, { name: "array", value: "number" }],
                summary: "number | [number, number]",
                detail: `Giving the value of a number is going to create a normal slider component,
giving on the otherhand an array of two numbers will give a ranged slider`,
            },
        },
        min: {
            name: "min",
            type: {
                name: "number",
                required: false,
                summary: "number",
            },
            description: "The starting point and minimum value of the slider",
        },
        max: {
            name: "max",
            type: {
                name: "number",
                required: true,
                summary: "number",
            },
            description: "The end point and maximum value of the slider",
        },
        onChange: {
            name: "onChange",
            type: {
                name: "function",
                required: true,
                summary: "(number | [number, number]) => void",
            },
            description: "Callback that gets called when the slider value has been changed",
        },
        trackMarks: {
            name: "trackMarks",
            description: "An array of trackmarks for the slider",
            type: {
                summary: "SliderTrackMark[]",
                name: "array",
                required: false,
                value: {
                    name: "other",
                    value: "SliderTrackMark",
                },
            },
            control: {
                type: null,
            },
        },
    },
} as ComponentMeta<typeof Button>;

const Template = (args: ButtonProps) => {
    return(
        <Button {...args}>Clicky Click</Button>
    );
};

export const Simple = Template.bind({});

Simple.args = {
};
