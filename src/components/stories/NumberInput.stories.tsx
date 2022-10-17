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
    argTypes: {},
} as ComponentMeta<typeof NumberInput>;

export const Simple = () => {
    const [value, setValue] = useState<number>(0);

    return <NumberInput placeholder="Please enter a number..." onChange={setValue} value={value} />;
};
