import React, { PropsWithChildren } from "react";

import { classNames, ComponentBase } from "./helpers";

type FormSubmitProps = ComponentBase;

export default function FormSubmit({
    children,
    className,
    style,
}: PropsWithChildren<FormSubmitProps>) {
    return (
        <button
            className={classNames("oc-button", "oc-button-right", "oc-primary", className)}
            style={style}
        >
            {children}
        </button>
    );
}
