import React, { useState } from "react";

import DatePicker from "../DatePicker";

import "../styles/Globals.scss";
import "./styles/global.scss";
import "../styles/Input.scss";
import "../styles/DatePicker.scss";

export default {
    title: "DatePicker",
    component: DatePicker,
};

const Template = (args) => {
    const [selected, setSelected] = useState<Date | undefined>(args.default);

    return (
        <div
            style={{
                margin: "10px auto",
                minHeight: 400,
                textAlign: "center",
            }}
        >
            <DatePicker
                value={selected ? new Date(selected) : undefined}
                onChange={(date) => setSelected(date)}
            />
        </div>
    );
};

const TemplateRange = (args) => {
    const [selected, setSelected] = useState<[Date | undefined, Date | undefined] | undefined>(
        args.default
    );

    return (
        <div
            style={{
                margin: "10px auto",
                minHeight: 400,
                textAlign: "center",
            }}
        >
            <DatePicker.Range
                value={selected}
                onChange={(value) => {
                    setSelected(value);
                    console.log(value);
                }}
            />
        </div>
    );
};

export const Simple = Template.bind({});
export const Range = TemplateRange.bind({});

Simple.args = {
    default: undefined,
};

Range.args = {
    default: undefined,
};
