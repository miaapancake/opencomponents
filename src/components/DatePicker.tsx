import { useClickOutside } from "@openthingies/hooks";
import React, { Fragment, useState } from "react";
import { usePopper } from "react-popper";

import DatePickerContext from "./contexts/DatePickerContext";
import { DatePickerBody } from "./DatePickerBody";
import { DatePickerHeader } from "./DatePickerHeader";
import { ApplyInputFormContext, classNames, compareDate, InputProps } from "./helpers";
import { useDatePicker, useRangeDatePicker } from "./hooks/useDatePicker";

export type DatePickerProps = InputProps<Date | undefined>;

function DatePicker(props: DatePickerProps) {
    const {
        value,
        dateChunks,
        setViewMonth,
        setViewYear,
        setYearView,
        viewMonth,
        viewYear,
        yearView,
    } = useDatePicker(props);

    return (
        <div className={classNames("oc-datepicker oc-input")}>
            <DatePickerContext.Provider
                value={{
                    setViewMonth,
                    setViewYear,
                    setYearView,
                    value,
                    yearView,
                    viewMonth,
                    viewYear,
                }}
            >
                <DatePickerHeader onNowClick={() => props.onChange(new Date())} />
                <DatePickerBody
                    dates={dateChunks}
                    onChangeDate={(date) => {
                        props.onChange(compareDate(date, value) ? undefined : date);
                        setViewMonth(date.getMonth());
                        setViewYear(date.getFullYear());
                    }}
                />
            </DatePickerContext.Provider>
        </div>
    );
}

export type RangeDatePickerProps = InputProps<[Date | undefined, Date | undefined]>;

function RangeDatePicker(props: RangeDatePickerProps) {
    const {
        value,
        dateChunks,
        setViewMonth,
        setViewYear,
        setYearView,
        viewMonth,
        viewYear,
        yearView,
        modifyDateRange,
    } = useRangeDatePicker(props);

    return (
        <div className={classNames("oc-datepicker oc-input")}>
            <DatePickerContext.Provider
                value={{
                    setViewMonth,
                    setViewYear,
                    setYearView,
                    yearView,
                    viewMonth,
                    viewYear,
                    value,
                }}
            >
                <DatePickerHeader
                    onNowClick={() => {
                        const nowDate = new Date();
                        props.onChange([nowDate, new Date(nowDate.setDate(nowDate.getDate() + 1))]);
                    }}
                />
                <DatePickerBody dates={dateChunks} onChangeDate={modifyDateRange} />
            </DatePickerContext.Provider>
        </div>
    );
}

const InputBase = <T extends InputProps<any>>(
    component: React.FunctionComponent<T>
): React.FunctionComponent<T> =>
    Object.assign(
        (props: T) => {
            /* eslint-disable react-hooks/rules-of-hooks */
            const [referenceElement, setReferenceElement] = useState<any>(null);
            const [popperElement, setPopperElement] = useState<any>(null);
            const [visible, setVisible] = useState<boolean>(false);
            const clickOutsideRef = useClickOutside(() => setVisible(false));

            // Initialize PopperJS with a 5px vertical offset
            const {
                attributes,
                styles: { popper: popstyles },
            } = usePopper(referenceElement, popperElement, {
                modifiers: [{ name: "offset", options: { offset: [0, 5] } }],
            });
            /* eslint-enable react-hooks/rules-of-hooks */

            return (
                <div ref={clickOutsideRef} className={classNames("oc-input", "oc-date-input")}>
                    {visible ? (
                        <div
                            ref={setPopperElement}
                            {...attributes}
                            style={popstyles}
                            className="oc-date-input-popup"
                        >
                            {component(props)}
                        </div>
                    ) : (
                        <Fragment />
                    )}
                    <input
                        onClick={() => setVisible(!visible)}
                        ref={setReferenceElement}
                        type="text"
                        value={props.value?.toDateString() ?? ""}
                        placeholder="Please select a date"
                    />
                </div>
            );
        },
        {
            displayName: component.displayName,
            defaultProps: component.defaultProps,
        }
    );

export const DateInput = ApplyInputFormContext(InputBase(DatePicker));
export const RangeDateInput = ApplyInputFormContext(InputBase(RangeDatePicker));

export default Object.assign(ApplyInputFormContext(DatePicker), {
    displayName: "DatePicker",
    Range: ApplyInputFormContext(
        Object.assign(RangeDatePicker, { displayName: "DatePicker.Range" })
    ),
});
