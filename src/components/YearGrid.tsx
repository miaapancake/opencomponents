import styled from "@emotion/styled";
import React from "react";

import { useTheme } from "./contexts/ThemeContext";

export interface YearGridProps {
    value: number;
    onChange: (value: number) => void;
}

export const years = Array.from({ length: 200 }, (_, i) => i + 1900);

const StyledYearGrid = styled.div(() => ({
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    fontFamily: useTheme().defaultFont,
    maxHeight: 250,
    overflowY: "auto",
}));

const StyledYearGridItem = styled.div<{ selected: boolean }>(({ selected }) => {
    const theme = useTheme();
    return {
        display: "inline-block",
        width: "25%",
        boxSizing: "border-box",
        cursor: "pointer",
        padding: 10,
        borderRadius: 10 * theme.roundingFactor,
        backgroundColor: selected ? theme.primaryColorActive : "none",
        color: selected ? theme.textPrimaryColorContrast : theme.textPrimaryColor,
        ":hover": {
            backgroundColor: theme.primaryColorHover,
            color: theme.textPrimaryColorContrast,
        },
    };
});

export function YearGrid({ value, onChange }: YearGridProps) {
    return (
        <StyledYearGrid>
            {years.map((year) => (
                <StyledYearGridItem
                    selected={value === year}
                    key={"datepicker-year-" + year}
                    ref={(ref) => {
                        if (value === year && ref) {
                            ref.scrollIntoView({ block: "nearest", inline: "nearest" });
                        }
                    }}
                    onClick={(e) => {
                        onChange(year);
                        e.stopPropagation();
                    }}
                >
                    {year}
                </StyledYearGridItem>
            ))}
        </StyledYearGrid>
    );
}
