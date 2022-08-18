import React, { PropsWithChildren } from "react";

import { classNames, ComponentBase } from "./helpers";

interface LabelProps extends ComponentBase {
    htmlFor: string;
}

function Label({ className, ...props }: PropsWithChildren<LabelProps>) {
    return <label className={classNames("oc-form-label", className)} {...props} />;
}

export default Label;
