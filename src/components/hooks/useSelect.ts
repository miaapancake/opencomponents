import { useClickOutside, useKeyPress } from "@openthingies/hooks";
import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { usePopper } from "react-popper";

import { SelectContextValue } from "../contexts/SelectContext";
import { modulo, PropsWithChildren, toggleOrSetValue, valueIn } from "../helpers";
import { SelectProps } from "../Select";
import { SelectItemProps } from "../SelectItem";

export default function useSelect({
    onChange,
    value,
    children,
    onBlur,
}: PropsWithChildren<SelectProps, SelectItemProps>) {
    const [visible, _setVisible] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [activeQueryItem, setActiveQueryItem] = useState<number | undefined>(undefined);
    const queryInputRef = useRef<HTMLInputElement>();
    const [referenceElement, setReferenceElement] = useState<any>(null);
    const [popperElement, setPopperElement] = useState<any>(null);

    // Initialize PopperJS with a 5px vertical offset
    const { attributes, styles: popStyles } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: "offset", options: { offset: [0, 5] } }],
    });

    const items = React.Children.map(children, (child) => child.props);

    // Handle closing the dropdown when clicking outside the dropdown
    const componentRef = useClickOutside(() => {
        if (visible) setVisible(false);
        setQuery("");
    });

    const setVisible = useCallback(
        (visible: boolean) => {
            _setVisible(visible);
            if (!visible && onBlur) onBlur();
        },
        [_setVisible, onBlur]
    );

    // Autofocus the input field once it is visible
    useEffect(() => {
        if (visible) {
            queryInputRef.current.focus();
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryInputRef.current]);

    // Set context value
    const contextValue = useMemo<SelectContextValue>(
        () => ({
            onChange,
            value,
            setQuery,
        }),
        [onChange, value, setQuery]
    );

    // Get selected items
    const selectedItems = useMemo(
        () => items.filter((item) => valueIn(item.value, value)),
        [value, items]
    );

    // Filter the item list by the current query
    const queryItems = useMemo(
        () =>
            query
                ? items.filter((x) => x.label.toUpperCase().includes(query.toUpperCase()))
                : items,
        [query, items]
    );

    // Keydown event for input
    const onKeyDown = useCallback(
        (e) => {
            if (!visible) return;

            let newQuery, up, len;
            switch (e.key) {
                case "Enter":
                    // When pressing enter toggle or set the
                    // currently selected item in the dropdown menu

                    if (queryItems[activeQueryItem]) {
                        onChange(toggleOrSetValue(queryItems[activeQueryItem].value, value));
                        setQuery("");
                    }

                    e.preventDefault();
                    break;

                // Welcome to the cursed zone
                case "ArrowUp":
                case "ArrowDown":
                    up = e.key === "ArrowUp";
                    len = queryItems.length;

                    // Make sure the value overflows/underflows back into range
                    newQuery = modulo(activeQueryItem - (up ? 1 : -1), len);

                    // If the modulo returns NaN that means our activeQueryItem is undefined
                    // In that case we want to set newQuery to the default value
                    // of the direction pressed
                    // Up = The bottom item
                    // Down = The top item
                    newQuery = !isNaN(newQuery) ? newQuery : up ? len - 1 : 0;

                    setActiveQueryItem(newQuery);
                    e.preventDefault();
                    break;
            }
        },
        [activeQueryItem, onChange, queryItems, value, setActiveQueryItem, setQuery, visible]
    );

    useKeyPress(onKeyDown);

    // Reset the active query item if the query changes
    useEffect(() => setActiveQueryItem(undefined), [query]);

    const displayValue = useMemo(() => {
        if (selectedItems.length > 1) {
            return selectedItems.map((x) => x.label).join(", ");
        } else if (selectedItems.length === 1) {
            return selectedItems[0].label;
        }

        return undefined;
    }, [selectedItems]);

    return {
        query,
        setQuery,
        queryInputRef,
        visible,
        setVisible,
        activeQueryItem,
        setActiveQueryItem,
        contextValue,
        componentRef,
        onKeyDown,
        queryItems,
        displayValue,
        referenceElement,
        setReferenceElement,
        popperElement,
        setPopperElement,
        attributes,
        popStyles,
    };
}
