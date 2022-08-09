import React, { CSSProperties, useContext, useMemo } from "react";

import AccordionContext from "./contexts/AccordionContext";
import AccordionItemContext from "./contexts/AccordionItemContext";
import { classNames, PropsWithChildren, valueIn } from "./helpers";

interface AccordionBodyProps {
    style?: CSSProperties;
}

export default function AccordionBody(props: PropsWithChildren<AccordionBodyProps, any>) {
    const { selected } = useContext(AccordionContext);
    const { id } = useContext(AccordionItemContext);

    const isSelected = useMemo(() => valueIn(id, selected), [selected, id]);

    return (
        <div
            className={classNames("oc-accordion-item-body", isSelected && "oc-selected")}
            {...props}
        />
    );
}
