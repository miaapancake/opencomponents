import { ComponentMeta } from "@storybook/react";
import React from "react";

import TextArea from "../TextArea";

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
    argTypes: {},
} as ComponentMeta<typeof TextArea>;

export const simple = () => <TextArea placeholder="Enter some text..." />;
