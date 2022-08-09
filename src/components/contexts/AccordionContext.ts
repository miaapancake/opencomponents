import React from "react";

export type AccordionId = string | number;

export interface AccordionContextValue {
    selected?: AccordionId | AccordionId[];
    onSelect?: (value: AccordionId | AccordionId[]) => void;
    alwaysOpen?: boolean;
}

const context = React.createContext<AccordionContextValue>({});
context.displayName = "AccordionContext";

export default context;
