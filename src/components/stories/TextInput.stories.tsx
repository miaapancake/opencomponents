import { ComponentMeta } from "@storybook/react";
import React from "react";

import TextInput from "../TextInput";

export default {
    title: "OpenComponents/Components/TextInput",
    component: TextInput,
    decorators: [
        (Story) => (
            <div style={{ margin: "3em auto", maxWidth: "400px", textAlign: "center" }}>
                {Story()}
            </div>
        ),
    ],
    argTypes: {},
} as ComponentMeta<typeof TextInput>;

export const simple = () => <TextInput placeholder="Enter some text..." />;
