import styled from "@emotion/styled";
import React, { PropsWithChildren, useContext } from "react";

import TabViewContext from "./contexts/TabViewContext";
import { EventKey, valueIn } from "./helpers";
import Box from "./primitives/Box";

export interface TabViewItemProps {
    eventKey: EventKey;
}

const StyledTabViewItem = styled(Box)<{ visible: boolean }>(({ visible }) => ({
    display: visible ? "block" : "none",
}));

export default function TabViewItem({ eventKey, children }: PropsWithChildren<TabViewItemProps>) {
    const { selected } = useContext(TabViewContext);

    return <StyledTabViewItem visible={valueIn(eventKey, selected)}>{children}</StyledTabViewItem>;
}
