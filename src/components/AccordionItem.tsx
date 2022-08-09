import React, { PropsWithChildren, useMemo } from "react";

import { AccordionId } from "./contexts/AccordionContext";
import AccordionItemContext, { AccordionItemContextValue } from "./contexts/AccordionItemContext";

interface AccordionItemProps {
    id: AccordionId;
}

export default function AccordionItem(props: PropsWithChildren<AccordionItemProps>) {
    const contextValue = useMemo<AccordionItemContextValue>(
        () => ({
            id: props.id,
        }),
        [props.id]
    );

    return (
        <div key={props.id} className="oc-accordion-item">
            <AccordionItemContext.Provider value={contextValue}>
                {props.children}
            </AccordionItemContext.Provider>
        </div>
    );
}
