import styled from "@emotion/styled";
import React, { PropsWithChildren, useContext } from "react";

import TabViewContext from "./contexts/TabViewContext";
import { useTheme } from "./contexts/ThemeContext";
import { EventKey, valueIn } from "./helpers";

export interface TabViewHeaderProps {
    eventKey: EventKey;
}

const StyledTabViewHeader = styled.li<{ active: boolean }>(({ active }) => {
    const theme = useTheme();

    return {
        display: "inline-block",
        fill: theme.textPrimaryColor,
        borderWidth: 1,
        padding: 10,
        borderBottomWidth: 2,
        borderBottomStyle: "solid",
        borderBottomColor: active ? theme.primaryColor : "transparent",
        color: active ? theme.primaryColor : theme.textPrimaryColor,
        cursor: "pointer",
        userSelect: "none",
        "&:hover": {
            color: theme.primaryColor,
        },
    };
});

export default function TabViewHeader({
    eventKey,
    children,
}: PropsWithChildren<TabViewHeaderProps>) {
    const { selected, onSelect } = useContext(TabViewContext);

    return (
        <StyledTabViewHeader
            onFocus={() => onSelect(eventKey)}
            active={valueIn(eventKey, selected)}
            tabIndex={0}
        >
            {children}
        </StyledTabViewHeader>
    );
}
