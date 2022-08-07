import { useEffect } from "@storybook/addons";
import React, { useState } from "react";

import TextArea, { TextAreaProps } from "../TextArea";
import "./styles/global.scss";

export default {
    title: "Text Area",
    component: TextArea
};


const Template = (args: TextAreaProps) => {

    const [text, setText] = useState(args.value);

    useEffect(() => {
        setText(args.value);
    }, [args.value]);

    return <TextArea
        style={args.style}
        value={text}
        maxLength={args.maxLength}
        onChange={setText}
    />;

};

export const Normal = Template.bind({});
export const WithLimit = Template.bind({});


Normal.args = {
    style: {
        maxWidth: "600px"
    },
    value: "Cat ipsum dolor sit amet, sitting in a box for kitty pounce, trip, faceplant you didn't see that no you didn't definitely didn't lick, lick, lick, and preen away the embarrassment and love fish so kitty kitty. Meowzer this cat happen now, it was too purr-fect!!! at four in the morning wake up owner meeeeeeooww scratch at legs and beg for food then cry and yowl until they wake up at two pm jump on window and sleep while observing the bootyful cat next door that u really like but who already has a boyfriend end up making babies with her and let her move in and unwrap toilet paper so spend all night ensuring people don't sleep sleep all day attack curtains."
};

WithLimit.args = {
    style: {
        maxWidth: "600px"
    },
    value: "Cat ipsum dolor sit amet, sitting in a box for kitty pounce, trip, faceplant you didn't see that no you didn't definitely didn't lick, lick, lick, and preen away the embarrassment and love fish so kitty kitty. Meowzer this cat happen now, it was too purr-fect!!! at four in the morning wake up owner meeeeeeooww scratch at legs and beg for food then cry and yowl until they wake up at two pm jump on window and sleep while observing the bootyful cat next door that u really like but who already has a boyfriend end up making babies with her and let her move in and unwrap toilet paper so spend all night ensuring people don't sleep sleep all day attack curtains.",
    maxLength: 800
};
