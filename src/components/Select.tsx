import React, { Fragment, useRef, useState } from "react";
import { usePopper } from "react-popper";

import SelectContext, { SelectValue } from "./contexts/SelectContext";
import { classNames, ComponentBase, PropsWithChildren } from "./helpers";
import useSelect from "./hooks/useSelect";
import SelectItem, { SelectItemProps } from "./SelectItem";

export interface SelectProps extends ComponentBase {
    selected?: string | number | (string | number)[];
    onSelect: (value: SelectValue | SelectValue[]) => void;
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
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        setVisible,
        setActiveQueryItem,
        activeQueryItem,
        visible,
        contextValue,
        componentRef,
        onKeyDown,
        onChange,
        displayValue,
        queryItems,
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
                className={classNames("oc-select-value", "oc-input")}
                ref={setReferenceElement as any}
            >
                <input
                    type="text"
                    ref={inputRef}
                    value={displayValue}
                    onChange={onChange}
                    onBlur={() => setActiveQueryItem(undefined)}
                    onFocus={() => setVisible(true)}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder ?? "Select..."}
                />
            </div>
            <SelectContext.Provider value={contextValue}>
                {visible ? (
                    <div
                        ref={setPopperElement as any}
                        onClick={() => inputRef.current.focus()}
                        style={popStyles.popper}
                        className={"oc-select-list"}
                        {...attributes}
                    >
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

export default Object.assign(Select, {
    Item: SelectItem,
});
