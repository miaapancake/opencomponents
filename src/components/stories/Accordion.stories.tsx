import { ComponentMeta } from "@storybook/react";
import React from "react";

import Accordion, { AccordionProps } from "../Accordion";
import Box from "../primitives/Box";

export default {
    title: "OpenComponents/Components/Accordion",
    component: Accordion,
    decorators: [
        (Story) => (
            <div style={{ margin: "3em auto", maxWidth: "400px", textAlign: "center" }}>
                {Story()}
            </div>
        ),
    ],
    argTypes: {
        defaultSelected: {
            name: "defaultSelected",
            description: "the default selected value of the accordion",
            type: {
                required: false,
                name: "other",
                value: "",
                summary: "string | number | (string | number)[]",
            },
            control: false,
        },
        onSelect: {
            name: "onSelect",
            description: "The callback for when an accordion item gets selected",
            type: {
                required: false,
                name: "other",
                value: "",
                summary: "(eventKey: string | number) => void",
            },
            control: false,
        },
        selected: {
            name: "selected",
            description: "The currently selected item of the accordion",
            type: {
                required: false,
                name: "other",
                value: "",
                summary: "string | number",
            },
            control: false,
        },
    },
} as ComponentMeta<typeof Accordion>;

const Template = (args: AccordionProps) => {
    return (
        <Accordion {...args}>
            <Accordion.Item eventKey={1}>
                <Accordion.Header>The letter A</Accordion.Header>
                <Accordion.Body>
                    <Box padding>Comes before B</Box>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey={2}>
                <Accordion.Header>The letter B</Accordion.Header>
                <Accordion.Body>
                    <Box padding>Comes before C</Box>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export const Simple = Template.bind({});
Simple.args = {};

export const AlwaysOpen = Template.bind({});
AlwaysOpen.args = {
    defaultSelected: [],
};
