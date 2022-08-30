import React, { Fragment } from "react";

import DownArrowIcon from "../icons/arrow-down-icon.svg";

import SelectContext, { SelectValue } from "./contexts/SelectContext";
import { ApplyInputFormContext, classNames, InputProps, PropsWithChildren } from "./helpers";
import useSelect from "./hooks/useSelect";
import SelectItem, { SelectItemProps } from "./SelectItem";
import TextInput from "./TextInput";

export interface SelectProps extends InputProps<SelectValue | SelectValue[]> {
    placeholder?: string;
    search?: boolean;
}

function Select({
    style: style,
    className,
    placeholder,
    ...props
}: PropsWithChildren<SelectProps, SelectItemProps>) {
    const {
        setVisible,
        activeQueryItem,
        visible,
        contextValue,
        componentRef,
        displayValue,
        queryItems,
        query,
        setQuery,
        attributes,
        setReferenceElement,
        setPopperElement,
        popStyles,
    } = useSelect(props);

    return (
        <div
            ref={componentRef}
            className={classNames("oc-select", visible && "oc-active", className)}
        >
            <div
                style={style}
                className={classNames("oc-select-value", "oc-input", props.error && "oc-error")}
                ref={setReferenceElement as any}
                onClick={() => setVisible(!visible)}
            >
                <span>{displayValue ?? placeholder ?? "Select..."}</span>
                <DownArrowIcon />
                {props.error ? <div className="oc-error-message">{props.error}</div> : <></>}
            </div>
            <SelectContext.Provider value={contextValue}>
                {visible ? (
                    <div
                        ref={setPopperElement as any}
                        style={popStyles.popper}
                        className={classNames("oc-select-list")}
                        {...attributes}
                    >
                        {props.search ? (
                            <TextInput
                                innerRef={(ref) => ref?.focus()}
                                className="oc-query-input"
                                type="text"
                                value={query}
                                onChange={setQuery}
                            />
                        ) : (
                            <></>
                        )}
                        {queryItems.map((item, i) => (
                            <SelectItem
                                key={item.value}
                                style={{
                                    backgroundColor:
                                        i === activeQueryItem ? "var(--color-active)" : undefined,
                                }}
                                label={item.label}
                                value={item.value}
                            />
                        ))}
                    </div>
                ) : (
                    <Fragment />
                )}
            </SelectContext.Provider>
        </div>
    );
}

export default Object.assign(ApplyInputFormContext(Select), {
    Item: SelectItem,
});
