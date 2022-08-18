import Joi from "joi";
import { createContext } from "react";

import { InputProps } from "../helpers";

export interface FormContextValue {
    register?: (
        name: string,
        componentName: string,
        validation?: Joi.Schema,
        defaultValue?: string | number
    ) => InputProps<any>;
    errors?: any;
}

const ctx = createContext<FormContextValue>({});

ctx.displayName = "FormContext";

export default ctx;
