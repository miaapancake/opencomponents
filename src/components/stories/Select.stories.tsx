import Select, { SelectItem } from "../Select";
import React, { useCallback, useState } from "react";
import "./styles/global.scss";

export default {
    title: "Select",
    component: Select
};


const mockData = [
    { id: 1, name: "cat", friendliness: 5 },
    { id: 2, name: "dog", friendliness: 8 },
    { id: 3, name: "snake", friendliness: 3 },
    { id: 4, name: "mosquito", friendliness: 0 },
    { id: 5, name: "Parastratiosphecomyia stratiosphecomyioides", friendliness: 39 }
];


export const SingleItem = () => {

    const [selected, setSelected] = useState<number | string | undefined>(undefined);

    return <Select value={selected} onSelect={(val) => setSelected(val)}>
        {mockData.map(item => <SelectItem key={item.id} label={item.name} value={item.id} />)}
    </Select>;
};

export const MultipleItems = () => {

    const [selected, setSelected] = useState<(number | string)[]>([]);

    const onSelect = useCallback((val: string | number) => {
        if(selected.includes(val)) setSelected(selected.filter(x => x !== val));
        else setSelected([...selected, val]);
    }, [selected]);

    return <Select value={selected} onSelect={onSelect}>
        {mockData.map(item => <SelectItem key={item.id} label={item.name} value={item.id} />)}
    </Select>;
};

 