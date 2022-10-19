import { ComponentMeta } from "@storybook/react";
import React, { useState } from "react";

import Select, { SelectProps } from "../Select";

export default {
    title: "OpenComponents/Components/Select",
    component: Select,
    decorators: [
        (Story) => (
            <div style={{ margin: "3em auto", maxWidth: "400px", textAlign: "center" }}>
                {Story()}
            </div>
        ),
    ],
    argTypes: {},
} as ComponentMeta<typeof Select>;

const Template = ({}: SelectProps) => {
    const [value, setValue] = useState<number>();

    return (
        <Select onChange={setValue} value={value}>
            <Select.Item label="potatoes" value={1} />
            <Select.Item label="cherries" value={2} />
            <Select.Item label="tomatoes" value={3} />
            <Select.Item label="bell peppers" value={4} />
            <Select.Item label="strawberries" value={5} />
        </Select>
    );
};

export const Simple = Template.bind({});

Simple.args = {};
