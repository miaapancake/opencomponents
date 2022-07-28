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

export const clamp = (value: number, min: number, max: number): number => Math.max(Math.min(value, max), min);

export const cn = (className?: string) => className ? ` ${className}` : '';

export type PropsWithChildren<PropsType, ChildPropsType = any> = PropsType & { children: React.ReactElement<ChildPropsType>[] }