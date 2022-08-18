import Joi from "joi";
import React, { CSSProperties, useContext } from "react";

import FormContext from "./contexts/FormContext";

export interface InputProps<ValueType> extends ComponentBase {
    value?: ValueType;
    onChange?: (value: ValueType) => void;
    onBlur?: (value?: string | number) => void;
    name?: string;
    validation?: Joi.Schema;
    error?: string;
}

export interface ComponentBase {
    className?: string;
    style?: CSSProperties;
}

/**
 * Compares two MIME types and see if they match
 * @param a the first MIME to compare
 * @param b the second MIME to compare
 * @returns true if the MIMEtypes match
 */
export const compareMime = (a: string, b: string) => {
    const [typeA, subtypeA] = a.toLowerCase().split(";")[0].split("/");
    const [typeB, subtypeB] = b.toLowerCase().split(";")[0].split("/");

    if (typeA !== typeB) return false;

    if (subtypeA !== subtypeB) {
        return subtypeA === "*";
    }

    return true;
};

/**
 * Applies the register function to the component if it is within a form context
 * @param component the component to apply the form context to
 * @param defaultValue the default value of this component within the form
 * @returns the new component that respects the form context
 */
export const ApplyInputFormContext = <T extends InputProps<any>>(
    component: (props: T) => JSX.Element,
    defaultValue?: string | number
) => {
    return function InputComponent(props: T) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { register } = useContext(FormContext);
        if (register && props.name)
            return component({
                ...props,
                ...register(
                    props.name,
                    component.name,
                    props.validation?.label(props.name) ?? undefined,
                    defaultValue
                ),
            });
        else return component(props);
    };
};

/**
 * Converts an object to uppercase only if it is a string otherwise leaves it untouched
 * @param item The item to selectively convert to upperCase
 * @returns The selectively uppercased item
 */
export const selectiveToUpper = (item: string | number) => {
    return typeof item === "string" ? item.toUpperCase() : item;
};

/**
 * Searches an array with selective uppercase inclusion
 * @param array Array to search for the item in
 * @param val The item to search for
 * @returns True if the item has been found, False if the item has not been found
 */
export const includesCaseInsensitive = (array: (string | number)[], val: string | number) => {
    return array.map(selectiveToUpper).includes(selectiveToUpper(val));
};

/**
 * Determines wether a state value is an array or single value and sets/toggles
 * the given value appropriately.
 *
 * @param newValue - The value to toggle or set the state value to
 * @param value - The newValue state value
 *
 * @returns The new modified state
 */
export const toggleOrSetValue = (
    newValue: string | number,
    value: string | number | (string | number)[]
) => {
    const val = Array.isArray(value) ? [...value] : value;

    if (Array.isArray(val) && includesCaseInsensitive(val, newValue)) {
        return val.filter((x) => selectiveToUpper(x) != selectiveToUpper(newValue));
    } else if (Array.isArray(val)) {
        return [...val, newValue];
    } else if (selectiveToUpper(val) === selectiveToUpper(newValue)) {
        return undefined;
    } else {
        return newValue;
    }
};

/**
 * Determines wether a state value is an array or single value and sets/adds
 * the given value appropriately.
 *
 * @param newValue - The value to add to or set the state value to
 * @param value - The current state value
 *
 * @returns The new modified state
 */
export const addOrSetValue = (
    newValue: string | number,
    value: string | number | (string | number)[]
) => {
    const val = Array.isArray(value) ? [...value] : value;

    if (Array.isArray(val) && !includesCaseInsensitive(val, newValue)) {
        return [...val, newValue];
    } else if (Array.isArray(val)) {
        return val;
    } else {
        return newValue;
    }
};

/**
 * Default comparison function for primitives
 * @param a first value
 * @param b second value
 * @returns the direction to move the current item in
 */
export const defaultSort = <T extends string | number | boolean>(a: T, b: T) => {
    switch (typeof a) {
        case "string":
            return a.localeCompare(b.toString());
        case "number":
            return a - (b as number);
        case "boolean":
            return (a ? 1 : -1) - (b ? 1 : -1);
        default:
            return 0;
    }
};

/**
 * Version of modulo that actually properly handles negative values
 * @param n
 * @param max
 * @returns
 */
export const modulo = (n: number, max: number) => ((n % max) + max) % max;

/**
 * Determines wether a value is an array or single value and appropiately checks
 * if the array contains current or if current is the same as value
 *
 * @param current - The current value
 * @param value - The value/array of values to compare against
 * @returns a boolean that is true if value contains or is equal to current
 *
 */
export const valueIn = (current: string | number, value: string | number | (string | number)[]) => {
    if (current === undefined || value === undefined) return false;
    return Array.isArray(value) ? value.includes(current) : value === current;
};

/**
 * Clamps a value between to values
 * - See: https://en.wikipedia.org/wiki/Clamping_(graphics)
 *
 * @param value the value to clamp
 * @param min the min value to clamp between
 * @param max the max value to clam between
 * @returns the clamped value
 */
export const clamp = (value: number, min: number, max: number): number =>
    Math.max(Math.min(value, max), min);

/**
 * Filters classnames based on if they're truthy and excludes any classnames that are falsy
 *
 * @param classNames The list of css classnames to filter
 * @returns the filered string of css classnames
 */
export const classNames = (...classNames: (string | undefined | boolean)[]) =>
    classNames.filter((x) => x).join(" ");

/**
 * Modified version of the built-in React `PropsWithChildren`
 * interface that supports defining prop types for those children
 */
export type PropsWithChildren<PropsType, ChildPropsType = any> = PropsType & {
    children: React.ReactElement<ChildPropsType> | React.ReactElement<ChildPropsType>[];
};

export type PropsWithAnyChildren<PropsType, ChildPropsType = any> = PropsType & {
    children: string | React.ReactElement<ChildPropsType> | React.ReactElement<ChildPropsType>[];
};

export type PropsWithChild<PropsType, ChildPropsType = any> = PropsType & {
    children: React.ReactElement<ChildPropsType>;
};
