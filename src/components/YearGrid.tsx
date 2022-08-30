import React from "react";

import { classNames } from "./helpers";

export interface YearGridProps {
    value: number;
    onChange: (value: number) => void;
}

export const years = Array.from({ length: 200 }, (_, i) => i + 1900);

export function YearGrid({ value, onChange }: YearGridProps) {
    return (
        <div className="oc-year-view">
            {years.map((year) => (
                <div
                    key={"datepicker-year-" + year}
                    ref={(ref) => {
                        if (value === year && ref) {
                            ref.scrollIntoView({ block: "nearest", inline: "nearest" });
                        }
                    }}
                    className={classNames("oc-year-item", year === value && "oc-active")}
                    onClick={(e) => {
                        onChange(year);
                        e.stopPropagation();
                    }}
                >
                    {year}
                </div>
            ))}
        </div>
    );
}
