import { ComponentMeta } from "@storybook/react";
import React from "react";

import Box from "../../primitives/Box";

export default {
    title: "OpenComponents/Primitives/Box",
    component: Box,
    decorators: [
        (Story) => (
            <div style={{ margin: "3em auto", maxWidth: "400px", textAlign: "center" }}>
                {Story()}
            </div>
        ),
    ],
    argTypes: {
        padding: {
            name: "padding",
            type: {
                name: "intersection",
                value: [
                    {
                        name: "number",
                    },
                    {
                        name: "boolean",
                    },
                ],
            },
            description: `Adds by default 10px padding to the box,
                can be set to a number to specify an amount of padding`,
            defaultValue: false,
        },
        rounded: {
            type: "boolean",
            description: "Adds rounded corners to the box",
        },
        shadow: {
            type: "boolean",
            description: "Adds a shadow to the box",
        },
        bordered: {
            type: "boolean",
            description: "Adds a border to the box",
        },
        theme: {
            table: {
                disable: true,
            },
        },
        as: {
            table: {
                disable: true,
            },
        },
    },
} as ComponentMeta<typeof Box>;

const content = "Hi I'm Boxy";

export const standardBox = ({}: any) => <Box>{content}</Box>;

export const roundedBoxWithStandardPadding = ({}: any) => (
    <Box padding rounded bordered>
        {content}
    </Box>
);

export const roundedBoxWithCustomPadding = ({}: any) => (
    <Box padding={20} rounded bordered>
        {content}
    </Box>
);

export const shadowBox = ({}: any) => (
    <Box padding rounded shadow>
        {content}
    </Box>
);

export const centerBox = ({}: any) => (
    <Box center padding bordered rounded style={{ minHeight: 400 }}>
        <div>{content}</div>
        <div>{content}</div>
        <div>{content}</div>
    </Box>
);
