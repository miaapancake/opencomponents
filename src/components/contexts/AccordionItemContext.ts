import React from "react";
import { AccordionId } from "./AccordionContext";

export interface AccordionItemContextValue {
  id?: AccordionId;
}

const context = React.createContext<AccordionItemContextValue>({});
context.displayName = "AccordionItemContext";

export default context;