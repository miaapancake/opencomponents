import styled from "@emotion/styled";
import React, { Fragment } from "react";

import DownArrowIcon from "../icons/arrow-down-icon.svg";

import SelectContext from "./contexts/SelectContext";
import { useTheme } from "./contexts/ThemeContext";
import { ApplyInputFormContext, InputProps as BaseInputProps, PropsWithChildren } from "./helpers";
import useSelect from "./hooks/useSelect";
import Box from "./primitives/Box";
import SelectItem, { SelectItemProps } from "./SelectItem";
import TextInput from "./TextInput";

export type InputProps =
    | BaseInputProps<number>
    | BaseInputProps<string>
    | BaseInputProps<number[]>
    | BaseInputProps<string[]>;

export interface SelectProps {
    placeholder?: string;
    search?: boolean;
}

const StyledSelect = styled(Box)({
    position: "relative",
});

const StyledSelectValue = styled(Box)<{ open: boolean }>(({ open }) => {
    const theme = useTheme();

    return {
        position: "relative",
        userSelect: "none",
        cursor: "pointer",
        background: open ? theme.inputBackgroundColorActive : theme.inputBackgroundColor,
        color: theme.textPrimaryColor,
    };
});

const StyledSelectList = styled(Box)(() => {
    const theme = useTheme();

    return {
        position: "absolute",
        width: "100%",
        overflow: "auto",
        backgroundColor: theme.inputBackgroundColor,
    };
});

const StyledDownArrowIcon = styled(DownArrowIcon)<{ open: boolean }>(({ open }) => ({
    position: "absolute",
    margin: "auto 0",
    top: 0,
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    transform: open ? "translate(-100%) rotate(180deg)" : "translate(-100%) rotate(0deg)",
    transition: "transform 150ms ease-in-out",
}));

function Select({
    style,
    className,
    placeholder,
    ...props
}: PropsWithChildren<SelectProps, SelectItemProps> & InputProps) {
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

    const theme = useTheme();

    return (
        <StyledSelect className={className} ref={componentRef}>
            <StyledSelectValue
                rounded
                padding
                open={visible}
                style={style}
                ref={setReferenceElement as any}
                onMouseDown={(e) => {
                    if (!visible) return;
                    setVisible(false);
                    e.preventDefault();
                    e.stopPropagation();
                    e.currentTarget.blur();
                }}
                onFocus={() => {
                    setVisible(true);
                }}
                tabIndex={0}
            >
                <span>{displayValue ?? placeholder ?? "Select..."}</span>
                <StyledDownArrowIcon open={visible} />
                {props.error ? <div className="oc-error-message">{props.error}</div> : <></>}
            </StyledSelectValue>
            <SelectContext.Provider value={contextValue}>
                {visible ? (
                    <StyledSelectList
                        shadow
                        rounded
                        ref={setPopperElement as any}
                        style={popStyles.popper}
                        {...attributes}
                    >
                        <div>
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
                                            i === activeQueryItem
                                                ? theme.primaryColorHover
                                                : undefined,
                                        color:
                                            i === activeQueryItem
                                                ? theme.textPrimaryColorContrast
                                                : undefined,
                                    }}
                                    {...item}
                                />
                            ))}
                        </div>
                    </StyledSelectList>
                ) : (
                    <Fragment />
                )}
            </SelectContext.Provider>
        </StyledSelect>
    );
}

export default Object.assign(ApplyInputFormContext(Select), {
    Item: SelectItem,
});
