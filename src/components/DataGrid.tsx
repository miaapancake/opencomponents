import styled from "@emotion/styled";
import React, { useMemo } from "react";
import { useUncontrolled } from "uncontrollable";

import DownArrowIcon from "../icons/arrow-down-icon.svg";

import { useTheme } from "./contexts/ThemeContext";
import { ComponentBase, toTitle } from "./helpers";
import Box from "./primitives/Box";

const StyledDownArrowIcon = styled(DownArrowIcon)<{ sorted: boolean; direction: "asc" | "desc" }>(
    ({ sorted, direction }) => ({
        display: sorted ? undefined : "none",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        marginTop: "auto",
        marginBottom: "auto",
        width: 12,
        height: 12,
        transition: "transform 150ms ease-in-out",
        transform: direction === "asc" ? "rotate(0deg)" : "rotate(180deg)",
    })
);

type SortMethod<T> = (a: T, b: T) => number;

export interface DataGridColumn<T> {
    sort?: SortMethod<T> | false;
    displayValue?: string;
}

export interface DataGridProps<T> extends ComponentBase {
    items: T[];
    headers: { [key: string]: DataGridColumn<T> };
    dataViewModels?: { [key: string]: (item: T) => JSX.Element | string };
    sortDirection?: "desc" | "asc";
    onChangeSortDirection?: (sortDirection: "desc" | "asc") => void;
    sortHeader?: string;
    onChangeSortHeader?: (header: string) => void;
}

const StyledDataGrid = styled.table(() => {
    const theme = useTheme();

    return {
        border: "none",
        borderSpacing: "0",
        borderCollapse: "collapse",
        fontFamily: theme.defaultFont,
        textAlign: "left",
        width: "100%",
        color: theme.textPrimaryColor,
    };
});

const StyledDataGridHead = styled.thead(() => {
    return {
        userSelect: "none",
    };
});

const StyledDataGridHeader = styled.th(() => {
    return {
        position: "relative",
        cursor: "pointer",
    };
});

const StyledDataGridRow = styled.tr(() => {
    return {
        ":nth-of-type(odd)": {
            backgroundColor: "rgba(0,0,0,.05)",
        },
    };
});

const defaultSort = (a: any, b: any): number => {
    switch (typeof a) {
        case "object":
            if (a instanceof Date) {
                return a.getTime() - b.getTime();
            }
            return 0;
        case "number":
            return a - (b as number);
        case "string":
            return a.localeCompare(b as string);
        default:
            return 0;
    }
};

const defaultViewModel = (data: any): string => {
    switch (typeof data) {
        case "object":
            if (data instanceof Date) {
                return data.toLocaleDateString();
            }
            return data.toString();
        case "bigint":
        case "number":
            return data.toString();
        case "string":
            return data;
        case "symbol":
            return data.toString();
        case "undefined":
            return "-";
    }
};

const DataGrid = <T,>(props: DataGridProps<T>) => {
    const {
        items,
        headers,
        dataViewModels,
        sortDirection,
        sortHeader,
        onChangeSortDirection,
        onChangeSortHeader,
        ...uncontrolledProps
    } = useUncontrolled(props, {
        sortDirection: "onChangeSortDirection",
        sortHeader: "onChangeSortHeader",
    });

    const sortedItems = useMemo(() => {
        const header = headers[sortHeader];

        if (!header) return items;

        let sort;

        if (header.sort !== undefined) {
            if (header.sort !== false) {
                sort = header.sort;
            }
        } else {
            sort = (a, b) => defaultSort(a[sortHeader], b[sortHeader]);
        }

        if (sort)
            return [...items].sort((a, b) => (sortDirection === "asc" ? sort(a, b) : sort(b, a)));

        return items;
    }, [items, sortHeader, sortDirection, headers]);

    return (
        <StyledDataGrid {...uncontrolledProps}>
            <StyledDataGridHead>
                <tr>
                    {Object.entries(headers).map(([name, { sort, displayValue }], i) => (
                        <StyledDataGridHeader
                            style={{ cursor: sort === false ? "default" : undefined }}
                            onClick={() => {
                                if (sortHeader === name) {
                                    if (sortDirection === "asc") onChangeSortDirection("desc");
                                    else {
                                        onChangeSortHeader(undefined);
                                    }
                                } else {
                                    onChangeSortDirection("asc");
                                    onChangeSortHeader(name);
                                }
                            }}
                            key={"th-" + i}
                        >
                            <Box padding>{displayValue ?? toTitle(name)}</Box>
                            <StyledDownArrowIcon
                                sorted={sortHeader === name}
                                direction={sortDirection}
                            />
                        </StyledDataGridHeader>
                    ))}
                </tr>
            </StyledDataGridHead>
            <tbody>
                {sortedItems.map((item, i) => (
                    <StyledDataGridRow key={"tr-" + i}>
                        {Object.keys(headers).map((header, i) => (
                            <td key={"tr-td-" + i}>
                                <Box padding>
                                    {dataViewModels && header in dataViewModels
                                        ? dataViewModels[header](item)
                                        : defaultViewModel(item[header])}
                                </Box>
                            </td>
                        ))}
                    </StyledDataGridRow>
                ))}
            </tbody>
        </StyledDataGrid>
    );
};

export default DataGrid;
