import React, { useContext } from "react";
import { CSSProperties } from "react";
import SelectContext from "./contexts/SelectContext";
import { classNames, toggleOrSetValue, valueIn } from "./helpers";

export interface SelectItemProps {
    value: string | number;
    label: string;
    style?: CSSProperties;
}

export default function SelectItem({value, label, style}: SelectItemProps) {

    const {selected, onSelect, setQuery} = useContext(SelectContext);

    return (
        <div 
            style={style}
            className={classNames("oc-select-item", valueIn(value, selected) && "oc-selected")}
            onClick={() => {
                onSelect(toggleOrSetValue(value, selected));
                setQuery("");
            }}>
            {label}
        </div>
    );

}
