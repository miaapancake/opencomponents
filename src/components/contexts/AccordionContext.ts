import React from "react";

import { EventKey } from "../helpers";
export interface AccordionContextValue {
    selected?: EventKey | EventKey[];
    onSelect?: (value: EventKey | EventKey[]) => void;
}

const context = React.createContext<AccordionContextValue>({});
context.displayName = "AccordionContext";

export default context;
