import React, { useContext, useMemo } from "react";

import TableContext from "./contexts/TableContext";
import { classNames, ComponentBase, defaultSort, PropsWithChildren } from "./helpers";
import { TableRowProps } from "./TableRow";

export type TableBodyProps = ComponentBase;

const getColumnValue = (child: React.ReactElement<TableRowProps>, column: string) => {
    const children = child.props.children;

    const subChild = Array.isArray(children)
        ? children.find((x) => x.props.column.toLowerCase() === column.toLowerCase())
        : children;

    return subChild.props.value;
};

export default function TableBody({
    style,
    className,
    children,
}: PropsWithChildren<TableBodyProps, TableRowProps>) {
    const { sortMethod, sortColumn, sortDirection } = useContext(TableContext);

    // Get the sorted array of the body's children which are the rows
    const sortedChildren = useMemo(() => {
        if (sortColumn && Array.isArray(children)) {
            // If a column has been selected and there are more than one child

            return [...children].sort((a, b) => {
                const valueA = getColumnValue(a, sortColumn);
                const valueB = getColumnValue(b, sortColumn);

                return (
                    (sortMethod ? sortMethod(valueA, valueB) : defaultSort(valueA, valueB)) *
                    sortDirection
                );
            });
        }

        return children;
    }, [children, sortMethod, sortColumn, sortDirection]);

    return (
        <tbody style={style} className={classNames("oc-table-body", className)}>
            {sortedChildren}
        </tbody>
    );
}
