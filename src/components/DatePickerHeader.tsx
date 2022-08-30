import React, { useContext } from "react";

import DownArrowIcon from "../icons/arrow-down-icon.svg";

import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import DatePickerContext from "./contexts/DatePickerContext";
import { classNames, monthWords } from "./helpers";

export interface DatePickerHeaderProps {
    onNowClick: () => void;
}

export function DatePickerHeader({ onNowClick }: DatePickerHeaderProps) {
    const { setViewMonth, setViewYear, setYearView, viewMonth, viewYear, yearView } =
        useContext(DatePickerContext);

    return (
        <div className="oc-datepicker-header">
            <div
                onClick={() => setYearView(!yearView)}
                className={classNames("oc-year-picker", yearView && "oc-active")}
            >
                {monthWords[viewMonth]} {viewYear}
                <DownArrowIcon />
            </div>
            <div className="oc-month-picker">
                <ButtonGroup>
                    <Button
                        onClick={() => {
                            if (viewMonth <= 0) {
                                setViewYear(viewYear - 1);
                            }
                            setViewMonth(viewMonth <= 0 ? 11 : viewMonth - 1);
                        }}
                    >
                        &lt;
                    </Button>
                    <Button
                        onClick={() => {
                            const now = new Date();
                            onNowClick();
                            setViewMonth(now.getMonth());
                            setViewYear(now.getFullYear());
                        }}
                    >
                        now
                    </Button>
                    <Button
                        onClick={() => {
                            if (viewMonth >= 11) {
                                setViewYear(viewYear + 1);
                            }
                            setViewMonth(viewMonth >= 11 ? 0 : viewMonth + 1);
                        }}
                    >
                        &gt;
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
}
