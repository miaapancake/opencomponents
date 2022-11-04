import styled from "@emotion/styled";
import React from "react";
import { useUncontrolled } from "uncontrollable";

import TabViewContext from "./contexts/TabViewContext";
import { EventKey, PropsWithChildren } from "./helpers";
import Box from "./primitives/Box";
import TabViewHeader from "./TabViewHeader";
import TabViewItem from "./TabViewItem";

export interface TabViewProps<T extends EventKey> {
    defaultSelected?: T;
    selected?: T;
    onSelect?: (key: T) => void;
}

const StyledTabView = styled(Box)({
    display: "flex",
    flexDirection: "column",
    width: "100%",
});

export const TabViewHeaders = styled.ul({
    display: "flex",
    width: "100%",
    margin: 0,
    padding: 0,
    listStyle: "none",
});

function TabView<T extends EventKey>({
    defaultSelected,
    ...props
}: PropsWithChildren<TabViewProps<T>>) {
    const {
        selected = defaultSelected,
        onSelect,
        children,
    } = useUncontrolled(props, {
        selected: "onSelect",
    });

    return (
        <StyledTabView>
            <TabViewContext.Provider value={{ selected, onSelect }}>
                {children}
            </TabViewContext.Provider>
        </StyledTabView>
    );
}

export default Object.assign(TabView, {
    Headers: TabViewHeaders,
    Header: TabViewHeader,
    Item: TabViewItem,
});
