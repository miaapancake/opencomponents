import React, { useMemo, useState } from "react";
import { useUncontrolled } from "uncontrollable";

import TableContext, { SortDirection, TableContextValue } from "./contexts/TableContext";
import { classNames, ComponentBase, PropsWithChildren } from "./helpers";
import TableBody, { TableBodyProps } from "./TableBody";
import TableColumn from "./TableColumn";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableRowItem from "./TableRowItem";

export interface TableProps extends PropsWithChildren<ComponentBase, TableBodyProps> {
    defaultSortColumn?: string;
}

export interface ControlledTableProps extends TableProps {
    sortColumn?: string;
    sortDirection?: SortDirection;
    setSortColumn?: (value: string) => void;
    setSortDirection?: (value: SortDirection) => void;
}

function Table(props: TableProps) {
    const [sortMethod, setSortMethod] = useState<(a, b) => number>();

    const {
        style,
        className,
        children,
        setSortColumn,
        setSortDirection,
        sortColumn = props.defaultSortColumn,
        sortDirection,
    } = useUncontrolled<ControlledTableProps>(props, {
        sortDirection: "setSortDirection",
        sortColumn: "setSortColumn",
    });

    const contextValue = useMemo<TableContextValue>(
        () => ({
            sortColumn,
            sortDirection,
            sortMethod,
            setSortColumn,
            setSortDirection,
            setSortMethod,
        }),
        [sortDirection, sortColumn, setSortDirection, setSortColumn, sortMethod, setSortMethod]
    );

    return (
        <div className={classNames("oc-table-container", className)}>
            <table style={style} className={classNames("oc-table")}>
                <TableContext.Provider value={contextValue}>{children}</TableContext.Provider>
            </table>
        </div>
    );
}

export default Object.assign(Table, {
    Body: TableBody,
    Header: TableHeader,
    Column: TableColumn,
    Row: TableRow,
    Item: TableRowItem,
});
