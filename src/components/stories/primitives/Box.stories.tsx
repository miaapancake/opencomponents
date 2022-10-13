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
    argTypes: {},
} as ComponentMeta<typeof Box>;

export const standardBox = (args: any) => <Box>Hi I'm a box</Box>;

export const paddedRoundedBox = (args: any) => <Box padding rounded bordered>Hi I'm a box</Box>;

export const valuePaddedRoundedBox = (args: any) => <Box padding={20} rounded bordered>Hi I'm a box</Box>;

export const shadowBox = (args: any) => <Box padding rounded shadow>Hi I'm a box</Box>;