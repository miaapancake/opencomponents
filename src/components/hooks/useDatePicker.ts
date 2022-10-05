import { useCallback, useMemo, useState } from "react";

import { DatePickerProps, RangeDatePickerProps } from "../DatePicker";
import { chunkReducer, compareDate, getDaysInMonth, getWeekDay } from "../helpers";

export function useDatePickerBase(startDate: Date) {
    const [viewMonth, setViewMonth] = useState<number>(startDate.getMonth());
    const [viewYear, setViewYear] = useState<number>(startDate.getFullYear());
    const [yearView, setYearView] = useState<boolean>(false);

    const [daysPrev, days] = useMemo(
        () => [
            getDaysInMonth(viewYear, viewMonth - 1),
            [...Array(getDaysInMonth(viewYear, viewMonth)).keys()].map((day) => day + 1),
        ],
        [viewYear, viewMonth]
    );

    const dateChunks = useMemo(() => {
        let prefixArray = [];
        let mainArray = [];
        const weekDay = getWeekDay(viewYear, viewMonth, 0);

        // Get the days of the month mapped to Date instances
        mainArray = days.map((day) => new Date(viewYear, viewMonth, day));

        // Get the prepending ghost dates
        for (let i = 0; i < weekDay; i++) {
            prefixArray = [new Date(viewYear, viewMonth - 1, daysPrev - i), ...prefixArray];
        }

        // Chunk the dates into arrays of length 7
        const chunked = [...prefixArray, ...mainArray].reduce(chunkReducer(7), []);

        // Fill the last chunk up to 7 items
        let i = 1;
        while (chunked[chunked.length - 1].length < 7) {
            chunked[chunked.length - 1].push(new Date(viewYear, viewMonth + 1, i++));
        }

        return chunked;
    }, [viewYear, viewMonth, days, daysPrev]);

    return {
        dateChunks,
        yearView,
        setYearView,
        viewYear,
        setViewYear,
        viewMonth,
        setViewMonth,
    };
}

export function useDatePicker(props: DatePickerProps) {
    const value = props.value;

    return {
        ...useDatePickerBase(props.value ?? new Date()),
        value,
    };
}

export function useRangeDatePicker(props: RangeDatePickerProps) {
    const value: Date | [Date | undefined, Date | undefined] = useMemo(
        () => props.value ?? [undefined, undefined],
        [props.value]
    );
    const { onChange } = props;

    const modifyDateRange = useCallback(
        (date) => {
            const [startDate, endDate] = value;

            if (startDate && !endDate) {
                // If we have the startdate selected but no selected enddate
                if (date < startDate) {
                    // If the user selects a date before the startdate
                    // make the current startdate the new enddate
                    // and make that selection the new start date
                    onChange([date, startDate]);
                } else if (compareDate(startDate, date)) {
                    // If the user selects the startdate just unselected everything
                    onChange([undefined, undefined]);
                } else {
                    // Otherwise select the new enddate
                    onChange([startDate, date]);
                }
            } else if (!startDate && endDate) {
                // If we have the enddate selected but no startdate

                if (date > endDate) {
                    // If the user selects a date after the enddate
                    // make the current enddate the new startdate
                    // and make that selection the new enddate
                    onChange([endDate, date]);
                } else if (compareDate(endDate, date)) {
                    // If the user selects the enddate just unselect everything
                    onChange([undefined, undefined]);
                } else {
                    // Otherwise just select the new startdate
                    onChange([date, endDate]);
                }
            } else if (startDate && endDate) {
                // If the user has selected both a startdate and an enddate
                if (compareDate(startDate, date)) {
                    // If the user selects the startdate unselect the startdate
                    onChange([undefined, endDate]);
                } else if (compareDate(endDate, date)) {
                    // If the user selects the enddate unselect the enddate
                    onChange([startDate, undefined]);
                } else if (date < startDate) {
                    // If the user selects before the range move the startdate
                    onChange([date, endDate]);
                } else if ((date > startDate && date < endDate) || date > endDate) {
                    // If the user selects within the range or past it move the enddate
                    onChange([startDate, date]);
                }
            } else {
                // If nothing is selected at all just select the startdate
                onChange([date, undefined]);
            }
        },
        [value, onChange]
    );

    return {
        ...useDatePickerBase(props.value?.[0] ?? new Date()),
        modifyDateRange,
        value,
    };
}
