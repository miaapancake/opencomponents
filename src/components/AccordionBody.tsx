import styled from "@emotion/styled";
import React, { useContext, useMemo, useRef } from "react";

import AccordionContext from "./contexts/AccordionContext";
import AccordionItemContext from "./contexts/AccordionItemContext";
import { ComponentBase, PropsWithAnyChildren, valueIn } from "./helpers";
import Box from "./primitives/Box";

type AccordionBodyProps = ComponentBase;

const StyledAccordionBody = styled(Box)({
    overflow: "hidden",
    transition: "max-height 200ms ease-out",
});

export default function AccordionBody({
    children,
    ...props
}: PropsWithAnyChildren<AccordionBodyProps, any>) {
    const { selected } = useContext(AccordionContext);
    const { eventKey: id } = useContext(AccordionItemContext);
    const contentContainer = useRef<HTMLDivElement>();

    const isSelected = useMemo(() => valueIn(id, selected), [selected, id]);

    return (
        <StyledAccordionBody
            style={{
                maxHeight: isSelected ? contentContainer.current.getBoundingClientRect().height : 0,
            }}
            {...props}
        >
            <div ref={contentContainer}>{children}</div>
        </StyledAccordionBody>
    );
}
