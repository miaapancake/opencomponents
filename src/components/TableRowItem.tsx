import React, { PropsWithChildren } from "react";

import { classNames, ComponentBase } from "./helpers";

export interface TableRowItemProps extends Partial<PropsWithChildren<ComponentBase>> {
    column: string;
    value: string | number;
}

export default function TableRowItem({ style, className, children, value }: TableRowItemProps) {
    return (
        <td style={style} className={classNames("oc-table-row-item", className)}>
            {children ?? value}
        </td>
    );
}
