import React, { PropsWithChildren, useMemo } from "react";

import AccordionItemContext, { AccordionItemContextValue } from "./contexts/AccordionItemContext";
import { EventKey } from "./helpers";

interface AccordionItemProps {
    eventKey: EventKey;
}

export default function AccordionItem(props: PropsWithChildren<AccordionItemProps>) {
    const contextValue = useMemo<AccordionItemContextValue>(
        () => ({
            eventKey: props.eventKey,
        }),
        [props.eventKey]
    );

    return (
        <div key={props.eventKey} className="oc-accordion-item">
            <AccordionItemContext.Provider value={contextValue}>
                {props.children}
            </AccordionItemContext.Provider>
        </div>
    );
}
