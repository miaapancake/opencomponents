import React, { useContext } from "react";

import DatePickerContext from "./contexts/DatePickerContext";
import DateGrid from "./DateGrid";
import { YearGrid } from "./YearGrid";

export interface DatePickerBodyProps {
    onChangeDate: (date: Date) => void;
    dates: Date[];
}

export const DatePickerBody = ({ dates, onChangeDate }: DatePickerBodyProps) => {
    const { setYearView, setViewYear, value, viewMonth, viewYear, yearView } =
        useContext(DatePickerContext);

    return (
        <div>
            {!yearView ? (
                <DateGrid dates={dates} month={viewMonth} onChange={onChangeDate} value={value} />
            ) : (
                <YearGrid
                    value={viewYear}
                    onChange={(year) => {
                        setViewYear(year);
                        setYearView(false);
                    }}
                />
            )}
        </div>
    );
};
