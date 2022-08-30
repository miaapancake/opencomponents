import React from "react";

import { classNames, compareDate, dayLetters } from "./helpers";

export interface DateGridProps {
    dates: Date[][];
    value: Date | [Date, Date | undefined];
    month: number;
    onChange: (date: Date) => void;
}

export function DateGrid({ dates, value, month, onChange }: DateGridProps) {
    return (
        <div className="oc-header-row">
            {dayLetters.map((day, i) => (
                <div key={"oc-day-item-header-" + i + day} className="oc-date-item">
                    {day}
                </div>
            ))}
            {dates.map((row, i) => (
                <div key={"date-row-" + i} className="oc-date-row">
                    {row.map((date: Date, i) => (
                        <div
                            key={"date-item" + i + date.toString()}
                            className={classNames(
                                "oc-date-item",
                                date !== undefined && "oc-enabled",
                                !Array.isArray(value) && compareDate(date, value) && "oc-active",
                                Array.isArray(value) &&
                                    date > value[0] &&
                                    date < value[1] &&
                                    "oc-active-range",
                                Array.isArray(value) &&
                                    ((value[1] && compareDate(date, value[1])) ||
                                        (!value[1] && compareDate(date, value[0]))) &&
                                    "oc-active-end",
                                Array.isArray(value) &&
                                    (compareDate(date, value[0]) ||
                                        (!value[0] && compareDate(date, value[1]))) &&
                                    "oc-active-start",
                                date.getMonth() != month && "oc-shadow"
                            )}
                            onClick={() => {
                                if (date !== undefined) {
                                    onChange(date);
                                }
                            }}
                        >
                            {date?.getDate()}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
