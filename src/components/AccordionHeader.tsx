import React, { CSSProperties, useContext, useMemo } from "react";

import AccordionContext from "./contexts/AccordionContext";
import AccordionItemContext from "./contexts/AccordionItemContext";
import { PropsWithChildren, valueIn, toggleOrSetValue } from "./helpers";

interface AccordionHeaderProps {
    style?: CSSProperties;
}

export default function AccordionHeader(props: PropsWithChildren<AccordionHeaderProps, any>) {
    
    const {selected, onSelect} = useContext(AccordionContext);
    const {id} = useContext(AccordionItemContext);
    
    const isSelected = useMemo(() => valueIn(id, selected), [selected, id]);
    
    return (
        <div {...props} onClick={() => onSelect(toggleOrSetValue(id, selected))} className={"oc-accordion-item-header" + (isSelected ? " oc-selected" : "") } />
    );

}
