import React from "react";

export interface PillBarContextValue {
    value?: string[] | number[];
    onChange?: (value: (number | string)[]) => void;
    scrollable?: boolean;
}

const context = React.createContext<PillBarContextValue>({});
context.displayName = "PillBarContext";

export default context;
