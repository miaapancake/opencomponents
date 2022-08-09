import { useEffect } from "@storybook/addons";
import { loremIpsum } from "lorem-ipsum";
import React, { useState } from "react";

import TextArea, { TextAreaProps } from "../TextArea";
import "./styles/global.scss";

export default {
    title: "Text Area",
    component: TextArea,
};

const Template = (args: TextAreaProps) => {
    const [text, setText] = useState(args.value);

    useEffect(() => {
        setText(args.value);
    }, [args.value]);

    return (
        <TextArea style={args.style} value={text} maxLength={args.maxLength} onChange={setText} />
    );
};

export const Normal = Template.bind({});
export const WithLimit = Template.bind({});

Normal.args = {
    style: {
        maxWidth: "600px",
    },
    value: loremIpsum({ count: 5 }),
};

WithLimit.args = {
    style: {
        maxWidth: "600px",
    },
    value: loremIpsum({ count: 5 }),
    maxLength: 800,
};
