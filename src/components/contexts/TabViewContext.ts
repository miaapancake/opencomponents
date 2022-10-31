import React from "react";

import { EventKey } from "../helpers";

export interface TabViewContextValue {
    selected?: EventKey;
    onSelect?: (value: EventKey) => void;
}

const context = React.createContext<TabViewContextValue>({});
context.displayName = "TabViewContext";

export default context;
