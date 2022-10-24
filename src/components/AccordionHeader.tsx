import styled from "@emotion/styled";
import React, { useContext } from "react";

import AccordionContext from "./contexts/AccordionContext";
import AccordionItemContext from "./contexts/AccordionItemContext";
import { toggleOrSetValue, PropsWithAnyChildren, ComponentBase } from "./helpers";
import Box from "./primitives/Box";

type AccordionHeaderProps = ComponentBase;

const StyledAccordionHeader = styled(Box)({
    userSelect: "none",
    cursor: "pointer",
});

export default function AccordionHeader(props: PropsWithAnyChildren<AccordionHeaderProps, any>) {
    const { selected, onSelect } = useContext(AccordionContext);
    const { eventKey } = useContext(AccordionItemContext);

    return (
        <StyledAccordionHeader
            padding={20}
            rounded
            {...props}
            onClick={() => onSelect(toggleOrSetValue(eventKey, selected))}
        />
    );
}
