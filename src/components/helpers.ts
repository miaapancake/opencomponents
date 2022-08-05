import React, { CSSProperties } from "react";

export interface InputProps<ValueType> extends ComponentBase {
    value: ValueType;
    onChange: (value: ValueType) => void;
    name?: string;
}

export interface ComponentBase {
    className?: string;
    style?: CSSProperties;
}

/**
 * Determines wether a state value is an array or single value and sets/toggles 
 * the given value appropriately.
 * 
 * @param current - The value to toggle or set the state value to
 * @param value - The current state value
 * 
 * @returns The new modified state
 */
export const toggleOrSetValue = (current: string | number, value: string | number | (string | number)[]) => {
    
    const val = Array.isArray(value) ? [...value] : value;
    
    if(Array.isArray(val) && val.includes(current)) {
        return val.filter(x => x != current);
    }else if(Array.isArray(val)) {
        return [...val,current];
    }else if(val === current) {
        return undefined;
    }else {
        return current;
    }

};


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
export const clamp = (value: number, min: number, max: number): number => Math.max(Math.min(value, max), min);

export const cn = (className: string | undefined) => className ? ` ${className}` : "";

/**
 * Filters classnames based on if they're truthy and excludes any classnames that are falsy
 * 
 * @param classNames The list of css classnames to filter
 * @returns the filered string of css classnames
 */
export const classNames = (...classNames: (string | undefined | boolean )[]) => classNames.filter(x => x).join(" ");

/**
 * Modified version of the built-in React `PropsWithChildren` interface that supports defining prop types for those children
 */
export type PropsWithChildren<PropsType, ChildPropsType = any> = PropsType & { children: React.ReactElement<ChildPropsType> | React.ReactElement<ChildPropsType>[] }