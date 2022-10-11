import { ComponentMeta } from "@storybook/react";
import React, { useState } from "react";

import DatePicker, { DatePickerProps, RangeDatePickerProps } from "../DatePicker";

export default {
    title: "OpenComponents/Components/DatePicker",
    component: DatePicker,
    decorators: [
        (Story) => (
            <div style={{ margin: "3em auto", maxWidth: "400px", textAlign: "center" }}>
                {Story()}
            </div>
        ),
    ],
    argTypes: {
        value: {
            name: "value",
            description: "The current date selected by the DatePicker",
            type: {
                name: "other",
                value: "date",
                summary: "Date",
            },
            control: false,
        },
        onChange: {
            name: "onChange",
            description: "Callback function with the new selected date as parameter",
            type: {
                name: "function",
                summary: "(newDate: Date | [Date | undefined, Date | undefined]) => void",
            },
            control: false,
        },
    },
} as ComponentMeta<typeof DatePicker>;

const DatePickerTemplate = ({}: DatePickerProps) => {
    const [selected, setSelected] = useState<Date | undefined>();

    return <DatePicker value={selected} onChange={setSelected} />;
};

const RangedDatePickerTemplate = ({}: RangeDatePickerProps) => {
    const [selected, setSelected] = useState<[Date | undefined, Date | undefined]>();

    return <DatePicker.Range value={selected} onChange={setSelected} />;
};

export const Simple = DatePickerTemplate.bind({});
Simple.args = {};

export const Ranged = RangedDatePickerTemplate.bind({});
Ranged.args = {};
