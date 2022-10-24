import React from "react";

export type AccordionEventKey = string | number;

export interface AccordionContextValue {
    selected?: AccordionEventKey | AccordionEventKey[];
    onSelect?: (value: AccordionEventKey | AccordionEventKey[]) => void;
}

const context = React.createContext<AccordionContextValue>({});
context.displayName = "AccordionContext";

export default context;
