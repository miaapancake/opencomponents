import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";

import { SelectContextValue } from "../contexts/SelectContext";
import { modulo, PropsWithChildren, toggleOrSetValue, valueIn } from "../helpers";
import { SelectProps } from "../Select";
import { SelectItemProps } from "../SelectItem";


export default function useSelect({onSelect, selected, children}: PropsWithChildren<SelectProps, SelectItemProps>) {
    
    const [visible, setVisible] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [activeQueryItem, setActiveQueryItem] = useState<number|undefined>(undefined);
    const componentRef = useRef<HTMLDivElement>(null);


    const items = React.Children.map(children, (child) => child.props);

    // Handle closing the dropdown when clicking outside the dropdown

    const handleWindowClick = useCallback((e: MouseEvent) => {
        if (componentRef?.current && !componentRef.current.contains(e.target as any)) {
            setVisible(false);
            setQuery("");
        }
    }, [componentRef, setQuery, setVisible]);
        
    useEffect(() => {
        window.addEventListener("mousedown", handleWindowClick);
        return () => window.removeEventListener("mousedown", handleWindowClick);
    }, [handleWindowClick]);

    // Set context value
    const contextValue = useMemo<SelectContextValue>(() => ({
        onSelect,
        selected,
        setQuery
    }), [selected, onSelect, setQuery]);


    // Get selected items
    const selectedItems = useMemo(() => items.filter(item => valueIn(item.value, selected)), [selected, items]); 

    // Filter the item list by the current query
    const queryItems = useMemo(() => {
        if(query) {
            const splitQuery = query.split(",");
            const trimmedQuery = splitQuery[splitQuery.length-1].trim();
            return items.filter(x => x.label.toLocaleLowerCase().includes(trimmedQuery.toLocaleLowerCase()));
        }
        return items;
        
    }, [query, items]);

    // Keydown event for input
    const onKeyDown = useCallback((e) => {
        let trimmedQuery, item, newQuery, up, len;
        switch(e.key) {
        case "Backspace":

            // Get the text after the last comma and find an item with that as the label
            trimmedQuery = e.target.value.split(",").at(-1).trimStart();
            item = items.find(x => x.label.toLowerCase() === trimmedQuery.toLowerCase());

            // If we do remove that item from the list and reset the current query to the new selected items
            if(item) {
                e.preventDefault();
                onSelect(Array.isArray(selected) ? selected.filter(x => x !== item.value) : undefined);
                setQuery("");
            }
            break;

        case "Enter":

            // When pressing enter toggle or set the currently selected item in the dropdown menu

            if(queryItems[activeQueryItem]){
                onSelect(toggleOrSetValue(queryItems[activeQueryItem].value, selected));
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
            newQuery = modulo(activeQueryItem-(up ? 1 : -1) , len);
            
            // If the modulo returns NaN that means our activeQueryItem is undefined
            // In that case we want to set newQuery to the default value of the direction pressed
            // Up = The bottom item
            // Down = The top item
            newQuery = !isNaN(newQuery) ? newQuery : up ? len-1 : 0;
            
            setActiveQueryItem(newQuery);
            e.preventDefault();
            break;
        } 
    }, [activeQueryItem, items, onSelect, queryItems, selected, setActiveQueryItem, setQuery]);

    // onChange event for input
    const onChange = useCallback((e) => { 
        const val = e.target.value;

        // If it is a multiselect
        if(Array.isArray(selected)) {

            // Map the content of the input to item selection
            let foundItems = val.split(",").map(x => items.find(item => item.label.toLowerCase() === x.trim().toLowerCase()));
            foundItems = foundItems.filter(x => x !== undefined);

            onSelect(foundItems.map(x => x.value));
        }else {

            // Map the content of the input to item selection
            const foundItem = items.find(item => item.label.toLowerCase() === val.split(",").at(-1).trim().toLowerCase());
            if(foundItem) onSelect(foundItem.value);
        }

        setQuery(e.target.value);
    }, [items, onSelect, selected]);

    // Reset the active query item if the query changes
    useEffect(() => setActiveQueryItem(undefined), [query]);

    const displayValue = useMemo(() => {

        if(query) {
            return query;
        }

        if(selectedItems.length > 1) {
            return selectedItems.map(x => x.label).join(", "); 
        }else if (selectedItems.length === 1){
            return selectedItems[0].label;
        }

        return "";
    }, [query, selectedItems]);

    return ({
        visible, setVisible,
        activeQueryItem, setActiveQueryItem,
        contextValue,
        componentRef,
        onKeyDown,
        onChange,
        queryItems,
        displayValue
    });
}
