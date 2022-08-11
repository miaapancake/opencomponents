import { createContext } from "react";

export enum SortDirection {
    Ascending = 1,
    Descending = -1,
}

export interface TableContextValue {
    sortColumn?: string;
    sortDirection?: SortDirection;
    setSortColumn?: (value: string) => void;
    setSortDirection?: (value: SortDirection) => void;
    sortMethod?: (a, b) => number;
    setSortMethod?: (method: (a, b) => void) => void;
}

const context = createContext<TableContextValue>({});

export default context;
