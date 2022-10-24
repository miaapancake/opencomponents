import { faker } from "@faker-js/faker";
import { ComponentMeta } from "@storybook/react";
import React, { useState } from "react";

import Button from "../Button";
import DataGrid from "../DataGrid";

export default {
    title: "OpenComponents/Components/DataGrid",
    component: DataGrid,
    decorators: [
        (Story) => (
            <div style={{ margin: "3em auto", maxWidth: "800px", textAlign: "center" }}>
                {Story()}
            </div>
        ),
    ],
    argTypes: {},
} as ComponentMeta<typeof DataGrid>;

interface Employee {
    name: string;
    age: number;
    company: string;
    employedSince: Date;
}

const generateEmployees = (size = 25) => {
    const items: Employee[] = [];
    for (let i = 0; i < size; i++) {
        items.push({
            name: faker.name.firstName() + " " + faker.name.lastName(),
            age: 20 + Math.round(Math.random() * 60),
            company: "Kittens " + faker.company.companySuffix(),
            employedSince: faker.date.past(),
        });
    }
    return items;
};

export const Simple = () => {
    const [items, setItems] = useState<Employee[]>(generateEmployees());
    const [sortColumn, setSortColumn] = useState<string>();

    return (
        <>
            <DataGrid
                sortHeader={sortColumn}
                onChangeSortHeader={setSortColumn}
                items={items}
                headers={{
                    name: {},
                    company: {},
                    age: {},
                    employedSince: {
                        displayValue: "Employement Date",
                    },
                }}
            />
            <Button style={{ marginTop: 15 }} onClick={() => setItems(generateEmployees())}>
                Refresh Data
            </Button>
        </>
    );
};
