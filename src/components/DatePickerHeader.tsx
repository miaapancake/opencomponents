import styled from "@emotion/styled";
import React, { useContext } from "react";

import DownArrowIcon from "../icons/arrow-down-icon.svg";

import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import DatePickerContext from "./contexts/DatePickerContext";
import { useTheme } from "./contexts/ThemeContext";
import { monthWords } from "./helpers";

const StyledDatePickerHeader = styled.div(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}));

const StyledDownArrowIcon = styled(DownArrowIcon)<{ open?: boolean }>(({ open }) => ({
    position: "absolute",
    marginLeft: 8,
    width: 16,
    height: 16,
    transition: "ease-out 100ms",
    transformOrigin: "center",
    transform: open ? "rotate(180deg)" : "rotate(0deg)",
}));

const StyledYearSelect = styled.div(() => ({
    paddingLeft: "10px",
    display: "inline-block",
    position: "relative",
    userSelect: "none",
    cursor: "pointer",
    fontFamily: useTheme().defaultFont,
}));

const StyledMonthSelect = styled(StyledYearSelect)(() => ({}));

export function DatePickerHeader() {
    const { setViewMonth, setViewYear, setYearView, viewMonth, viewYear, yearView } =
        useContext(DatePickerContext);

    return (
        <StyledDatePickerHeader>
            <StyledYearSelect onClick={() => setYearView(!yearView)}>
                <span>
                    {monthWords[viewMonth]} {viewYear}
                </span>
                <StyledDownArrowIcon open={yearView} />
            </StyledYearSelect>
            <StyledMonthSelect>
                <ButtonGroup>
                    <Button
                        onClick={() => {
                            if (viewMonth <= 0) {
                                setViewYear(viewYear - 1);
                            }
                            setViewMonth(viewMonth <= 0 ? 11 : viewMonth - 1);
                        }}
                    >
                        &lt;
                    </Button>
                    <Button
                        onClick={() => {
                            const now = new Date();
                            setViewMonth(now.getMonth());
                            setViewYear(now.getFullYear());
                        }}
                    >
                        now
                    </Button>
                    <Button
                        onClick={() => {
                            if (viewMonth >= 11) {
                                setViewYear(viewYear + 1);
                            }
                            setViewMonth(viewMonth >= 11 ? 0 : viewMonth + 1);
                        }}
                    >
                        &gt;
                    </Button>
                </ButtonGroup>
            </StyledMonthSelect>
        </StyledDatePickerHeader>
    );
}
