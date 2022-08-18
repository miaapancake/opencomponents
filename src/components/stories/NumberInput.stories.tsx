import { useEffect } from "@storybook/addons";
import React, { useState } from "react";

import NumberInput, { NumberInputProps } from "../NumberInput";
import "./styles/global.scss";

export default {
    title: "Number Input",
    component: NumberInput,
};

const Template = (args: NumberInputProps) => {
    const [value, setValue] = useState<number>(+(args.value ?? 0));

    useEffect(() => {
        setValue(+(args.value ?? 0));
    }, [args.value]);

    return (
        <NumberInput
            style={args.style}
            value={value}
            min={args.min}
            max={args.max}
            onChange={(val) => (val ? setValue(val) : undefined)}
            stepSize={args.stepSize ? +args.stepSize : undefined}
        />
    );
};

export const Normal = Template.bind({});

Normal.args = {
    value: 5,
    style: { maxWidth: "150px" },
};
