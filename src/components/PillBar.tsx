import styled from "@emotion/styled";
import React, { useCallback, useContext, useMemo, useRef } from "react";

import Button from "./Button";
import PillBarContext from "./contexts/PillBarContext";
import {
    ApplyInputFormContext,
    InputProps as BaseInputProps,
    PropsWithChildren,
    toggleOrSetValue,
    valueIn,
} from "./helpers";
import Box from "./primitives/Box";
import BasePill from "./primitives/Pill";

const RoundButton = styled(Button)({
    borderRadius: "50%",
    padding: 0,
    minWidth: 40,
    height: 40,
    lineHeight: "40px",
});

const StyledPillBar = styled(Box)<PillBarProps>(({ scrollable, gradientBase }) => ({
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    "::after, ::before": {
        zIndex: 5,
        marginLeft: "40px",
        left: 0,
        right: 0,
        display: scrollable ? "block" : "none",
        position: "absolute",
        content: "''",
        height: "100%",
        width: 30,
        background: `linear-gradient(to right,${
            gradientBase ?? "rgba(0,0,0,0)"
        } 20%,rgba(33,33,33,0) 80%)`,
    },
    "::after": {
        marginRight: "40px",
        marginLeft: "auto",
        background: `linear-gradient(to left,${
            gradientBase ?? "rgba(0,0,0,0)"
        } 20%,rgba(33,33,33,0) 80%)`,
    },
}));

const StyledPillBarInner = styled(Box)<PillBarProps>(({ scrollable, gradientBase }) => ({
    paddingLeft: gradientBase && scrollable ? 15 : 0,
    paddingRight: gradientBase && scrollable ? 15 : 0,
    position: "relative",
    justifyContent: scrollable ? undefined : "center",
    alignItems: scrollable ? undefined : "center",
    overflowX: scrollable ? "auto" : undefined,
    msOverflowStyle: scrollable ? "none" : undefined,
    scrollbarWidth: scrollable ? "none" : undefined,
    flexWrap: scrollable ? undefined : "wrap",
    overscrollBehavior: "contain",
    "::-webkit-scrollbar": {
        display: scrollable ? "none" : undefined,
    },
}));

type InputProps = BaseInputProps<string[]> | BaseInputProps<number[]>;

export interface PillBarProps {
    gradientBase?: string;
    scrollable?: boolean;
}

interface PillProps {
    value: string | number;
}

export function Pill(props: React.PropsWithChildren<PillProps>) {
    const { onChange, value, scrollable } = useContext(PillBarContext);

    return (
        <BasePill
            style={{ marginBottom: scrollable ? 0 : undefined }}
            active={valueIn(props.value, value)}
            onClick={() => onChange(toggleOrSetValue(props.value, value) as any)}
            clickable
        >
            {props.children}
        </BasePill>
    );
}

function PillBar({
    value,
    onChange,
    scrollable,
    gradientBase,
    children,
}: PropsWithChildren<PillBarProps> & InputProps) {
    const ref = useRef<HTMLDivElement>();

    const parsedValue = useMemo(() => value ?? [], [value]);

    const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        ref.current.scrollBy(e.deltaY, 0);
    }, []);

    return (
        <StyledPillBar gradientBase={gradientBase} scrollable={scrollable} flex>
            {scrollable ? (
                <RoundButton onClick={() => ref.current.scrollBy(-ref.current.offsetWidth / 2, 0)}>
                    &lt;
                </RoundButton>
            ) : (
                <></>
            )}
            <StyledPillBarInner
                gradientBase={gradientBase}
                scrollable={scrollable}
                ref={ref}
                onWheel={onWheel}
                flex
            >
                <PillBarContext.Provider
                    value={{
                        scrollable,
                        onChange,
                        value: parsedValue,
                    }}
                >
                    {children}
                </PillBarContext.Provider>
            </StyledPillBarInner>
            {scrollable ? (
                <RoundButton onClick={() => ref.current.scrollBy(ref.current.offsetWidth / 2, 0)}>
                    &gt;
                </RoundButton>
            ) : (
                <></>
            )}
        </StyledPillBar>
    );
}

export default ApplyInputFormContext(PillBar);
