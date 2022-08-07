import React, { CSSProperties, useMemo } from "react";
import { useUncontrolled } from "uncontrollable";

import AccordionBody from "./AccordionBody";
import AccordionHeader from "./AccordionHeader";
import AccordionItem from "./AccordionItem";
import AccordionContext, { AccordionId } from "./contexts/AccordionContext";
import { PropsWithChildren } from "./helpers";

interface AccordionProps {
    defaultSelected?: AccordionId | AccordionId[];
    onSelect?: (value: AccordionId | AccordionId[]) => void;
    selected?: AccordionId | AccordionId[];
    alwaysOpen?: boolean;
    style?: CSSProperties;
}

//Hi Jotti
function Accordion(props: PropsWithChildren<AccordionProps>) {
    
    const {
        selected = props.defaultSelected,
        onSelect,
        alwaysOpen
    } = useUncontrolled(props, {
        selected: "onSelect"
    });

    const contextValue = useMemo(
        () => ({
            selected,
            onSelect,
            alwaysOpen,
        }),
        [selected, onSelect, alwaysOpen]
    );

    return (
        <div className="oc-accordion" style={props.style}>
            <AccordionContext.Provider value={contextValue}>
                {props.children}
            </AccordionContext.Provider>
        </div>
    );

}

export default Object.assign(Accordion,
    {
        Item: AccordionItem,
        Body: AccordionBody,
        Header: AccordionHeader
    }   
);
