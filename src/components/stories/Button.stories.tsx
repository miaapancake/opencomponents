import { ComponentMeta } from "@storybook/react";
import React, { useState } from "react";

import Button, { ButtonProps } from "../Button";
import ButtonGroup from "../ButtonGroup";

export default {
    title: "OpenComponents/Components/Button",
    component: Button,
    decorators: [
        (Story) => (
            <div style={{ margin: "3em auto", maxWidth: "400px", textAlign: "center" }}>
                {Story()}
            </div>
        ),
    ],
    argTypes: {},
} as ComponentMeta<typeof Button>;

const Template = (args: ButtonProps) => {
    return (
        <>
            <Button style={{ margin: "5px" }} {...args}>
                Clicky Click
            </Button>
            <Button style={{ margin: "5px" }} {...args} buttonStyle="primary">
                Clicky Click
            </Button>
            <Button style={{ margin: "5px" }} {...args} buttonStyle="secondary">
                Clicky Click
            </Button>
        </>
    );
};

export const Simple = Template.bind({});

Simple.args = {};

const GroupTemplate = () => {
    const [selected, setSelected] = useState<number>(1);

    return (
        <>
            <ButtonGroup onChange={setSelected} value={selected}>
                <Button eventKey={1}>1</Button>
                <Button eventKey={2}>2</Button>
                <Button eventKey={3}>3</Button>
                <Button eventKey={4}>4</Button>
            </ButtonGroup>
            <ButtonGroup onChange={setSelected} value={selected}>
                <Button buttonStyle="primary" eventKey={1}>
                    1
                </Button>
                <Button buttonStyle="primary" eventKey={2}>
                    2
                </Button>
                <Button buttonStyle="primary" eventKey={3}>
                    3
                </Button>
                <Button buttonStyle="primary" eventKey={4}>
                    4
                </Button>
            </ButtonGroup>
            <ButtonGroup onChange={setSelected} value={selected}>
                <Button buttonStyle="secondary" eventKey={1}>
                    1
                </Button>
                <Button buttonStyle="secondary" eventKey={2}>
                    2
                </Button>
                <Button buttonStyle="secondary" eventKey={3}>
                    3
                </Button>
                <Button buttonStyle="secondary" eventKey={4}>
                    4
                </Button>
            </ButtonGroup>
        </>
    );
};

export const Group = GroupTemplate.bind({});

Group.args = {};
