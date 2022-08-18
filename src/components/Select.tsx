import React, { Fragment, useState } from "react";
import { usePopper } from "react-popper";

import SelectContext, { SelectValue } from "./contexts/SelectContext";
import { ApplyInputFormContext, classNames, InputProps, PropsWithChildren } from "./helpers";
import useSelect from "./hooks/useSelect";
import SelectItem, { SelectItemProps } from "./SelectItem";
import TextInput from "./TextInput";

export interface SelectProps extends InputProps<SelectValue | SelectValue[]> {
    placeholder?: string;
}

function Select({
    style: style,
    className,
    placeholder,
    ...props
}: PropsWithChildren<SelectProps, SelectItemProps>) {
    const [referenceElement, setReferenceElement] = useState<any>(null);
    const [popperElement, setPopperElement] = useState<any>(null);

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
        queryInputRef,
    } = useSelect(props);

    // Initialize PopperJS with a 5px vertical offset
    const { attributes, styles: popStyles } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: "offset", options: { offset: [0, 5] } }],
    });

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
                {props.error ? <div className="oc-error-message">{props.error}</div> : <></>}
            </div>
            <SelectContext.Provider value={contextValue}>
                {visible ? (
                    <div
                        ref={setPopperElement as any}
                        style={popStyles.popper}
                        className={"oc-select-list"}
                        {...attributes}
                    >
                        <TextInput
                            innerRef={queryInputRef}
                            className="oc-query-input"
                            type="text"
                            value={query}
                            onChange={setQuery}
                        />
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
