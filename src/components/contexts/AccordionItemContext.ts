import React from "react";

import { AccordionEventKey } from "./AccordionContext";

export interface AccordionItemContextValue {
    eventKey?: AccordionEventKey;
}

const context = React.createContext<AccordionItemContextValue>({});
context.displayName = "AccordionItemContext";

export default context;
