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


export const toggleOrSetValue = (current: string | number, value: string | number | (string | number)[]) => {
    
    let val = Array.isArray(value) ? [...value] : value;
    
    if(Array.isArray(val)) {
        if(val.includes(current)) {
            val = val.filter(x => x != current);
        }else {
            val = [...val,current];
        }
    }else {
        if(val === current) {
            val = undefined;
        }else {
            val = current;
        }
    }

    return val;
}

export const valueIn = (current: string | number, value: string | number | (string | number)[]) => {
    return Array.isArray(value) ? value.includes(current) : value === current;
}

export const clamp = (value: number, min: number, max: number): number => Math.max(Math.min(value, max), min);

export const cn = (className: string | undefined) => className ? ` ${className}` : '';

export const classNames = (...classNames: (string | undefined | boolean )[]) => classNames.filter(x => x).join(' ');

export type PropsWithChildren<PropsType, ChildPropsType = any> = PropsType & { children: React.ReactElement<ChildPropsType> | React.ReactElement<ChildPropsType>[] }