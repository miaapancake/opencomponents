import React from "react";

import { classNames, ComponentBase, PropsWithChildren } from "./helpers";
import { TableRowItemProps } from "./TableRowItem";

export type TableRowProps = PropsWithChildren<ComponentBase, TableRowItemProps>;

export default function TableRow({ style, className, children }: TableRowProps) {
    return (
        <tr style={style} className={classNames("oc-table-row", className)}>
            {children}
        </tr>
    );
}
