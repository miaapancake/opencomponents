import styled from "@emotion/styled";
import { ComponentMeta } from "@storybook/react";
import React from "react";

import Pill from "../../primitives/Pill";

export default {
    title: "OpenComponents/Primitives/Pill",
    component: Pill,
    decorators: [
        (Story) => (
            <div style={{ margin: "3em auto", maxWidth: "400px", textAlign: "center" }}>
                {Story()}
            </div>
        ),
    ],
    argTypes: {
        active: {
            defaultValue: false,
        },
        clickable: {
            defaultValue: false,
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
} as ComponentMeta<typeof Pill>;

const BluePill = styled(Pill)({
    backgroundColor: "#3498db",
    color: "#fff",
    ":hover": {
        backgroundColor: "#2980b9",
    },
});
const RedPill = styled(Pill)({
    backgroundColor: "#e74c3c",
    color: "#fff",
    ":hover": {
        backgroundColor: "#c0392b",
    },
});
const GreenPill = styled(Pill)({
    backgroundColor: "#2ecc71",
    color: "#fff",
    ":hover": {
        backgroundColor: "#27ae60",
    },
});

export const standardPill = (args: any) => (
    <>
        <Pill {...args}>Paracetamol</Pill>
        <BluePill {...args}>Ibuprofen</BluePill>
        <RedPill {...args}>Tramadol</RedPill>
        <GreenPill {...args}>Diclofenac</GreenPill>
    </>
);
