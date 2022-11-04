import React from "react";

import { EventKey } from "../helpers";

export interface ButtonGroupContextValue {
    selected?: EventKey | EventKey[];
    onSelect?: (value: EventKey | EventKey[]) => void;
}

const context = React.createContext<ButtonGroupContextValue>({});
context.displayName = "ButtonGroupContext";

export default context;
