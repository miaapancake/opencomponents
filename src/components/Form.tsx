import Joi from "joi";
import React, { PropsWithChildren, useCallback, useRef, useState } from "react";

import FormContext from "./contexts/FormContext";
import { SelectedFile } from "./FileSelect";
import FormSubmit from "./FormSubmit";
import { classNames, ComponentBase, InputProps } from "./helpers";

interface FormProps extends PropsWithChildren<ComponentBase> {
    onSubmit: <T>(data: T) => void;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
    ({ onSubmit, className, style, children }, ref) => {
        const [validations, setValidations] = useState<any>({});
        const [value, setValue] = useState<{ [key: string]: string | number | SelectedFile[] }>({});
        const [errors, setErrors] = useState<any>({});
        const componentTypes = useRef<any>({});

        const handleSubmit = useCallback(
            (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();

                const { error } = Joi.object(validations).validate(value, { abortEarly: false });

                if (error) {
                    // Turn the error details given by a joi object into an key:value errors object
                    // where key is the input name and value is the message
                    const errors = error.details.reduce(
                        (a, v) => ({ ...a, [v.path[0]]: v.message }),
                        {}
                    );

                    // Set current errors to that error object so they are displayed to the user
                    setErrors(errors);
                    return;
                }

                let finalValue: string | FormData;

                if ("FileSelect" in componentTypes.current) {
                    // If the form contains at least 1 file use formdata as the payload type
                    const formdata = new FormData();
                    for (const [k, v] of Object.entries(value)) {
                        if (v instanceof Array<SelectedFile>) {
                            for (const i in v) {
                                formdata.append(k, v[i].file);
                            }
                        } else if (v !== undefined) {
                            formdata.set(k, v.toString());
                        }
                    }
                    finalValue = formdata;
                } else {
                    // Otherwise just a json serialized object
                    finalValue = JSON.stringify(value);
                }

                onSubmit(finalValue);
            },
            [value, onSubmit, validations]
        );

        const validate = useCallback(
            (newValue: string | number | SelectedFile[], validation: Joi.Schema, name: string) => {
                const { error } = validation.validate(newValue);

                if (error) {
                    setErrors({ ...errors, [name]: error.message });
                    return;
                }

                const newErrors = { ...errors };
                delete newErrors[name];
                setErrors(newErrors);
            },
            [setErrors, errors]
        );

        const register = useCallback(
            (
                name: string,
                componentName: string,
                validation?: Joi.Schema,
                defaultValue?: string | number
            ): InputProps<any> => {
                if (!(name in componentTypes.current) && componentName != undefined) {
                    componentTypes.current[componentName] = true;
                }

                if (!(name in value) && defaultValue != undefined) {
                    value[name] = defaultValue;
                    setValue(value);
                }

                if (!(name in validations)) {
                    validations[name] = validation ?? Joi.any();
                    setValidations(validations);
                }

                return {
                    name: name,
                    value: value[name] ?? undefined,
                    error: errors[name] ?? undefined,
                    onChange: (val: any) => {
                        if (validation && name in errors) {
                            validate(val, validation, name);
                        }
                        setValue({ ...value, [name]: val });
                    },
                    onBlur: (newValue?: string | number | SelectedFile[]) => {
                        if (validation) {
                            validate(newValue ?? value[name], validation, name);
                        }
                    },
                };
            },
            [value, setValue, errors, validate, validations, componentTypes]
        );

        return (
            <form
                onSubmit={handleSubmit}
                className={classNames("oc-form", "oc-clearfix", className)}
                style={style}
                ref={ref}
            >
                <FormContext.Provider value={{ register, errors }}>{children}</FormContext.Provider>
            </form>
        );
    }
);

Form.displayName = "Form";

export default Object.assign(Form, { Submit: FormSubmit });
