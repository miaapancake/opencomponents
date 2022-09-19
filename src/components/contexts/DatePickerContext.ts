import React from "react";

export interface DatePickerContextValue {
    value?: Date | [Date | undefined, Date | undefined];
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
