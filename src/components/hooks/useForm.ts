import React, { FormEvent, useCallback, useState } from "react";

export interface RegisterOptions {
    value?: any;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: {
        exp: RegExp;
        error?: string;
    };
    validate?: {
        func: (value: any) => boolean;
        error?: string;
    };
    disabled?: boolean;
}

export default function useForm<DataType>() {
    const [data, setData] = useState<Partial<DataType>>({});
    const [errors, setErrors] = useState<Partial<DataType>>({});

    const onBlur = useCallback(
        <T>(name: string, val: T, options?: RegisterOptions) => {
            const { minLength, maxLength, min, max, pattern, validate, required } = options ?? {};
            const errorList = [];

            if (required && val === undefined) errorList.push(`${name} is required`);
            else if (
                required &&
                Array.isArray(val) &&
                val.filter((x) => x === undefined).length > 1
            )
                errorList.push(`${name} is required`);
            else if (
                required &&
                Array.isArray(val) &&
                val.filter((x) => x !== undefined).length < 1
            )
                errorList.push(`${name} is required`);

            if (val !== undefined && typeof val === "string") {
                if (required && val.length < 1) {
                    errorList.push(`${name} is required!`);
                }
                if (minLength && val.length < minLength) {
                    errorList.push(`${name} should be at least ${minLength} long`);
                }
                if (maxLength && val.length > maxLength) {
                    errorList.push(`${name} should be at most ${maxLength} long`);
                }
                if (pattern && !val.match(pattern.exp)) {
                    errorList.push(
                        pattern.error ?? `${name} does not match the expression ${pattern.exp}`
                    );
                }
            }
            if (val !== undefined && typeof val === "number") {
                if (min && val < min) {
                    errorList.push(`${name} should be at least ${minLength}`);
                }
                if (max && val > max) {
                    errorList.push(`${name} should be at most ${max} long`);
                }
            }

            if (val !== undefined && validate && !validate.func(val)) {
                errorList.push(validate.error ?? `${name} failed validation`);
            }

            setErrors((currentErrors) => {
                return {
                    ...currentErrors,
                    [name]: errorList.length > 0 ? errorList : undefined,
                };
            });
        },
        [setErrors]
    );

    const onBlurNative = useCallback(
        (name: string, e: React.ChangeEvent<HTMLInputElement>, options?: RegisterOptions) => {
            switch (e.currentTarget.type as React.HTMLInputTypeAttribute) {
                default:
                    return onBlur(name, e.currentTarget.value, options);
                case "number":
                    return onBlur(name, Number(e.currentTarget.value), options);
            }
        },
        [onBlur]
    );

    const onChange = useCallback(
        <T>(name: string, val: T, options?: RegisterOptions) => {
            setData((currentData) => ({ ...currentData, [name]: val }));
            if (errors[name]) {
                onBlur(name, val, options);
            }
        },
        [errors, onBlur]
    );

    const onChangeNative = useCallback(
        (name: string, e: React.ChangeEvent<HTMLInputElement>, options?: RegisterOptions) => {
            switch (e.currentTarget.type as React.HTMLInputTypeAttribute) {
                default:
                    return onChange(name, e.currentTarget.value, options);
                case "number":
                    return onChange(name, Number(e.currentTarget.value), options);
            }
        },
        [onChange]
    );

    const register = useCallback(
        (name: string, options?: RegisterOptions) => {
            const { value, disabled, maxLength, min, max } = options ?? {};

            return {
                onChange: (val) =>
                    typeof val === "object" && "currentTarget" in val
                        ? onChangeNative(name, val, options)
                        : onChange(name, val, options),
                onBlur: (val) =>
                    typeof val === "object" && "currentTarget" in val
                        ? onBlurNative(name, val, options)
                        : onBlur(name, val, options),
                value: data[name] ?? value,
                style: {
                    margin: "10px 0px",
                },
                disabled,
                maxLength,
                min,
                max,
            };
        },
        [data, onBlur, onBlurNative, onChange, onChangeNative]
    );

    const submit = useCallback(
        (cb: (data: Partial<DataType>) => void) => ({
            onSubmit: (e: FormEvent) => {
                e.preventDefault();
                cb(data);
            },
        }),
        [data]
    );

    return {
        submit,
        register,
        data,
        errors,
    };
}
