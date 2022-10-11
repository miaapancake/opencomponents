import React from "react";

import { Maybe } from "../helpers";

export interface DatePickerContextValue {
    value?: Date | [Maybe<Date>, Maybe<Date>];
    yearView?: boolean;
    viewYear?: number;
    viewMonth?: number;
    setViewYear?: (year: number) => void;
    setViewMonth?: (month: number) => void;
    setYearView?: (active: boolean) => void;
}

const context = React.createContext<DatePickerContextValue>({});
context.displayName = "DatePickerContextValue";

export default context;
