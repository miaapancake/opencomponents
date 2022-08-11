import React from "react";

export type ButtonId = string | number;

export interface ButtonGroupContextValue {
    selected?: ButtonId | ButtonId[];
    onSelect?: (value: ButtonId | ButtonId[]) => void;
}

const context = React.createContext<ButtonGroupContextValue>({});
context.displayName = "ButtonGroupContext";

export default context;
