import { createContext, CSSProperties, Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";
import React from "react";
import { cn, ComponentBase, PropsWithChildren } from "./helpers";

import "./styles/Select.scss";
import "./styles/Input.scss";

export interface SelectProps extends ComponentBase {
    value?: string | number | (string | number)[];
    onSelect: (value: string | number) => void;
    placeholder?: string;
}

const SelectedContext = createContext<(string | number)[]>([]);

export default function Select(props: PropsWithChildren<SelectProps, SelectItemProps>) {

    const items = React.Children.map(props.children, (child) => {
        return child.props;
    });
    
    const componentRef = useRef<HTMLDivElement>(null);
    const [referenceElement, setReferenceElement] = useState<any>(null);
    const [popperElement, setPopperElement] = useState<any>(null);
    const [visible, setVisible] = useState<boolean>(false);

    const multi = Array.isArray(props.value);
    
    // Normalize Value Variable To Array 
    const values: (string | number)[] = Array.isArray(props.value) ? props.value : props.value ? [props.value] : [];

    // Filter items to only the one's selected by values
    const selected = items.filter(x => values.includes(x.value));

    // Initialize PopperJS with a 5px vertical offset 
    const { attributes, styles: popStyles } = usePopper(referenceElement, popperElement, {
        modifiers: [
            {name: "offset", options: { offset: [0, 5]} }
        ]
    });

    // Handle closing the dropdown when clicking outside the dropdown

    const handleWindowClick = useCallback((e: MouseEvent) => {
        if (componentRef?.current && !componentRef.current.contains(e.target as any))
            setVisible(false);
    }, [componentRef]);
        
    useEffect(() => {
        window.addEventListener("mousedown", handleWindowClick);
        return () => window.removeEventListener("mousedown", handleWindowClick);
    }, [handleWindowClick]);


    return (
        <div ref={componentRef} className={"oc_select" + cn(props.className)}>
            <div style={props.style} className={"oc_select_value oc_input"} onClick={() => { setVisible(!visible); }} ref={setReferenceElement as any}>
                <input
                    type='text'
                    value={ 
                        selected.length <= 1 ?
                            selected[0]?.label ?? (props.placeholder ?? `Select item${multi ? "s" : ""}...`) 
                            : `${selected.length} items` 
                    }
                />
            </div>
            { 
                visible ? 
                    <div ref={setPopperElement as any} {...attributes} style={popStyles.popper} className={"oc_select_list"}>
                        <SelectedContext.Provider value={values}>
                            {React.Children.map(props.children, (child) => 
                                React.cloneElement(child, { onClick: (value: string | number) => props.onSelect(value)}) )}
                        </SelectedContext.Provider>
                    </div>
                    : 
                    <Fragment />
            }
        </div>

    );
}

interface SelectItemProps {
    value: string | number;
    label: string;
    style?: CSSProperties;
    onClick?: (value: string | number) => void;
}

export function SelectItem({value, label, style, onClick}: SelectItemProps) {

    const values = useContext(SelectedContext);

    return (
        <div 
            style={style}
            className={"oc_select_item" + (values.includes(value) ? " oc_selected" : "")}
            onClick={() => onClick(value)}>
            {label}
        </div>
    );

}