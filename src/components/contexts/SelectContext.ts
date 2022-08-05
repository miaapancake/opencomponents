import { createContext } from "react";


export type SelectValue = string|number;

export interface SelectContextValue {
    selected?: SelectValue | SelectValue[];
    onSelect?: (value: SelectValue | SelectValue[]) => void;
    setQuery?: (query: string) => void;
}

const context = createContext<SelectContextValue>({});

export default context;
