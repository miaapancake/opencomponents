import React from "react";

import { EventKey } from "../helpers";

export interface AccordionItemContextValue {
    eventKey?: EventKey;
}

const context = React.createContext<AccordionItemContextValue>({});
context.displayName = "AccordionItemContext";

export default context;
