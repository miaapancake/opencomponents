import styled from "@emotion/styled";
import React, { CSSProperties, useMemo } from "react";
import { useUncontrolled } from "uncontrollable";

import AccordionBody from "./AccordionBody";
import AccordionHeader from "./AccordionHeader";
import AccordionItem from "./AccordionItem";
import AccordionContext from "./contexts/AccordionContext";
import { EventKey, PropsWithChildren } from "./helpers";
import Box from "./primitives/Box";

export interface AccordionProps {
    defaultSelected?: EventKey | EventKey[];
    onSelect?: (value: EventKey | EventKey[]) => void;
    selected?: EventKey | EventKey[];
    style?: CSSProperties;
}

const StyledAccordion = styled(Box)({
    width: "100%",
});

//Hi Jotti
function Accordion(props: PropsWithChildren<AccordionProps>) {
    const { selected = props.defaultSelected, onSelect } = useUncontrolled(props, {
        selected: "onSelect",
    });

    const contextValue = useMemo(
        () => ({
            selected,
            onSelect,
        }),
        [selected, onSelect]
    );

    return (
        <StyledAccordion bordered rounded style={props.style}>
            <AccordionContext.Provider value={contextValue}>
                {props.children}
            </AccordionContext.Provider>
        </StyledAccordion>
    );
}

export default Object.assign(Accordion, {
    Item: AccordionItem,
    Body: AccordionBody,
    Header: AccordionHeader,
});
