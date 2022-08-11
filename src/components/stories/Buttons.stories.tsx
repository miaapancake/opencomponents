import React, { useState } from "react";

import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import "../styles/Button.scss";

export default {
    title: "Buttons",
    component: Button,
};

const Template = (args) => {
    return (
        <Button style={args.style} buttonStyle={args.buttonStyle}>
            Click Me!
        </Button>
    );
};
const GroupTemplate = (args) => {
    const [selected, setSelected] = useState<string | number | (string | number)[]>(1);

    return (
        <>
            <ButtonGroup>
                <Button buttonStyle={args.buttonStyle}>New File</Button>
                <Button buttonStyle={args.buttonStyle}>Edit</Button>
                <Button buttonStyle={args.buttonStyle}>Move</Button>
                <Button buttonStyle={args.buttonStyle}>Delete</Button>
            </ButtonGroup>
            <ButtonGroup onSelect={setSelected} selected={selected}>
                <Button id={1} buttonStyle={args.buttonStyle}>
                    1
                </Button>
                <Button id={2} buttonStyle={args.buttonStyle}>
                    2
                </Button>
                <Button id={3} buttonStyle={args.buttonStyle}>
                    3
                </Button>
                <Button id={4} buttonStyle={args.buttonStyle}>
                    4
                </Button>
                <Button id={5} buttonStyle={args.buttonStyle}>
                    5
                </Button>
            </ButtonGroup>
        </>
    );
};

export const Normal = Template.bind({});

Normal.args = {
    buttonStyle: "flat",
};

export const Grouped = GroupTemplate.bind({});

Grouped.args = {
    buttonStyle: "primary",
};
