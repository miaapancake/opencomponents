import Accordion from "../Accordion";
import React from "react";
import "../styles/Accordion.scss";
import "./styles/global.scss";
import {loremIpsum} from "lorem-ipsum";

export default {
    title: "Accordion",
    component: Accordion
};

const items = [
    {id: 0, name: "Bees", status: "Cute"},
    {id: 1, name: "Fire", status: "Hot"},
    {id: 2, name: "Cats", status: "Mean"},
    {id: 3, name: "Mosqitos", status: "Evil"},
    {id: 4, name: "Dogs", status: "Weird & Dumb"},
    {id: 5, name: "My Uncle", status: loremIpsum({count: 10})}
];

const Template = (args: any) => {
    
    return (
        <Accordion defaultSelected={args.defaultSelected} style={args.style}>
            {
                items.map(item => (
                    <Accordion.Item key={item.id} id={item.id}>
                        <Accordion.Header>
                            <div className='accordion_header'>{item.name}</div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className='accordion_body'>{item.name} {item.name.endsWith("s") ? "are" : "is"} {item.status}</div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))
            }
        </Accordion>
    );
};

export const Single = Template.bind({});
export const Multi = Template.bind({});
export const DefaultOpen = Template.bind({});

Single.args = {
    style: {
        maxWidth: "600px"
    }
};

Multi.args = {
    defaultSelected: [],
    style: {
        maxWidth: "600px"
    }
};

DefaultOpen.args = {
    defaultSelected: 3,
    style: {
        maxWidth: "600px"
    }
};