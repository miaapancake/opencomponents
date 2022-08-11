import React, { useCallback, useContext } from "react";

import TableContext, { SortDirection } from "./contexts/TableContext";
import { classNames, ComponentBase } from "./helpers";

export interface TableColumnProps extends ComponentBase {
    children: string;
    sortMethod?: (a, b) => number;
}

export default function TableColumn(props: TableColumnProps) {
    const { setSortColumn, setSortMethod, sortColumn, setSortDirection, sortDirection } =
        useContext(TableContext);

    const onClick = useCallback(() => {
        setSortColumn(props.children);
        setSortMethod(() => props.sortMethod);
        if (props.children.toLowerCase() === sortColumn?.toLowerCase())
            setSortDirection(-sortDirection);
        else setSortDirection(SortDirection.Ascending);
    }, [
        sortColumn,
        setSortColumn,
        setSortDirection,
        sortDirection,
        props.children,
        props.sortMethod,
        setSortMethod,
    ]);

    return (
        <th
            onClick={onClick}
            style={props.style}
            className={classNames("oc-table-column", props.className)}
        >
            {props.children}
        </th>
    );
}
