import styled from "@emotion/styled";
import React, { useContext, CSSProperties } from "react";

import SelectContext, { SelectValue } from "./contexts/SelectContext";
import { useTheme } from "./contexts/ThemeContext";
import { toggleOrSetValue, valueIn } from "./helpers";
import Box from "./primitives/Box";

export interface SelectItemProps {
    value: SelectValue;
    label: string;
    style?: CSSProperties;
}

const StyledSelectItem = styled(Box)<{ selected?: boolean }>(({ selected }) => {
    const theme = useTheme();

    return {
        cursor: "pointer",
        backgroundColor: selected ? theme.primaryColorActive : undefined,
        color: selected ? theme.textPrimaryColorContrast : theme.textPrimaryColor,
        ":hover": {
            background: theme.primaryColorHover,
            color: theme.textPrimaryColorContrast,
        },
    };
});

export default function SelectItem({ value, label, style }: SelectItemProps) {
    const { value: selected, onChange: onSelect, setQuery } = useContext(SelectContext);

    return (
        <StyledSelectItem
            padding
            selected={valueIn(value, selected)}
            style={style}
            onClick={() => {
                onSelect(toggleOrSetValue(value, selected));
                setQuery("");
            }}
        >
            {label}
        </StyledSelectItem>
    );
}
