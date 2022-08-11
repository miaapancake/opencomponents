import { faker } from "@faker-js/faker";
import React from "react";

import Table, { TableProps } from "../Table";
import "./styles/global.scss";
import "../styles/Table.scss";

export default {
    title: "Table",
    component: Table,
};

const generateRows = () => {
    const rows: any[] = [];

    for (let i = 1; i <= 10; i++) {
        rows.push({
            id: i,
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            income: Math.round(Math.random() * 10000),
        });
    }

    return rows;
};

const rows = generateRows();

const Template = ({}: TableProps) => {
    return (
        <Table>
            <Table.Header>
                <Table.Column>Id</Table.Column>
                <Table.Column>Name</Table.Column>
                <Table.Column>Last Name</Table.Column>
                <Table.Column>Income</Table.Column>
            </Table.Header>
            <Table.Body>
                {rows.map((person) => (
                    <Table.Row key={person.id}>
                        <Table.Item column="id" value={person.id} />
                        <Table.Item column="name" value={person.name} />
                        <Table.Item column="last name" value={person.lastName} />
                        <Table.Item
                            style={{
                                color: person.income < 3700 ? "#fff" : undefined,
                                backgroundColor: person.income < 3700 ? "#e74c3c" : undefined,
                            }}
                            column="income"
                            value={person.income}
                        >
                            {person.income} Euros / Year
                        </Table.Item>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export const Normal = Template.bind({});

Normal.args = {};
