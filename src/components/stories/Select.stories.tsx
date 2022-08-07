import React, { useState } from "react";

import { SelectValue } from "../contexts/SelectContext";
import Select from "../Select";
import SelectItem from "../SelectItem";

import "../styles/Globals.scss";
import "./styles/global.scss";
import "../styles/Select.scss";
import "../styles/Input.scss";

export default {
    title: "Select",
    component: Select
};


const mockData = [
    { id: 1, name: "Cat", friendliness: 5 },
    { id: 2, name: "Dog", friendliness: 8 },
    { id: 3, name: "Snake", friendliness: 3 },
    { id: 4, name: "Mosquito", friendliness: 0 },
    { id: 5, name: "Parastratiosphecomyia", friendliness: 39 }
];


const Template = (args) => {

    const [selected, setSelected] = useState<SelectValue | SelectValue[] | undefined>(args.default);

    return (<Select selected={selected} onSelect={setSelected}>
        {mockData.map(item => <SelectItem key={item.id} label={item.name} value={item.id} />)}
    </Select>);
};


export const Single = Template.bind({});
export const Multiple = Template.bind({});

Single.args = {
    default: undefined
};

Multiple.args = {
    default: []
};
