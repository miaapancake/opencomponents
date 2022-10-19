import { createContext } from "react";

export type SelectValue = number | string;

export interface SelectContextValue {
    value?: SelectValue | SelectValue[];
    onChange?: (value: SelectValue | SelectValue[]) => void;
    setQuery?: (query: string) => void;
}

const context = createContext<SelectContextValue>({});

export default context;
