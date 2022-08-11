import React from "react";

import { classNames, ComponentBase, PropsWithChildren } from "./helpers";
import { TableColumnProps } from "./TableColumn";

export type TableHeaderProps = ComponentBase;

export default function TableHeader({
    style,
    className,
    children,
}: PropsWithChildren<TableHeaderProps, TableColumnProps>) {
    return (
        <thead style={style} className={classNames("oc-table-header", className)}>
            <tr>{children}</tr>
        </thead>
    );
}
