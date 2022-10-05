import { ComponentMeta } from "@storybook/react";
import React, { useState } from "react";

import Slider, { SliderProps } from "../Slider";

import "../styles/Globals.scss";
import "../styles/Slider.scss";

export default {
    title: "OpenComponents/Components/Slider",
    component: Slider,
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
} as ComponentMeta<typeof Slider>;

const Template = <T extends number | [number, number]>(args: SliderProps<T>) => {
    const [value, setValue] = useState<number | [number, number]>(args.value);

    return <Slider {...args} value={value} onChange={setValue} />;
};

export const Simple = Template.bind({});

Simple.args = { value: 20, min: 0, max: 100 };

export const WithStepSize = Template.bind({});

WithStepSize.args = { value: 20, min: 0, max: 100, stepSize: 10 };

export const WithTrackMarkers = Template.bind({});

WithTrackMarkers.args = {
    value: 20,
    min: 0,
    max: 100,
    stepSize: 5,
    trackMarks: [
        { value: 0, label: (value) => `$${value}` },
        { value: 20, label: (value) => `$${value}` },
        { value: 40, label: (value) => `$${value}` },
        { value: 60, label: (value) => `$${value}` },
        { value: 80, label: (value) => `$${value}` },
        { value: 100, label: (value) => `$${value}` },
    ],
};

export const WithRestrictedMarkers = Template.bind({});

WithRestrictedMarkers.args = {
    value: 1,
    min: 1,
    max: 3,
    stepSize: null,
    trackMarks: [
        { value: 1, label: () => "Slow" },
        { value: 2, label: () => "Medium" },
        { value: 3, label: () => "Fast" },
    ],
};

export const RangedExample = Template.bind({});

RangedExample.args = {
    value: [200, 1200],
    min: 0,
    max: 2000,
    stepSize: 10,
    trackMarks: [
        { value: 0, label: (value) => `$${value}` },
        { value: 500, label: (value) => `$${value}` },
        { value: 1000, label: (value) => `$${value}` },
        { value: 1500, label: (value) => `$${value}` },
        { value: 2000, label: (value) => `$${value}` },
    ],
};
