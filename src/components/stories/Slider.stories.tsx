import React, { useState } from "react";

import Slider from "../Slider";
import "../styles/Slider.scss";

export default {
    title: "Slider",
    component: Slider,
};

const SliderTemplate = () => {
    const [value, setValue] = useState(30);
    const [value2, setValue2] = useState<[number, number]>([30, 70]);

    const markers: any[] = [];

    for (let i = 30; i <= 100; i += 10) {
        markers.push({ value: i, label: i.toString() });
    }

    return (
        <div
            style={{
                margin: "10px auto",
                maxWidth: 400,
                minHeight: 100,
                textAlign: "center",
            }}
        >
            <Slider
                trackMarks={markers}
                stepSize={null}
                value={value}
                min={30}
                max={100}
                onChange={setValue}
            />
            <Slider stepSize={10} value={value2} min={30} max={100} onChange={setValue2} />
        </div>
    );
};

export const SimpleSlider = SliderTemplate.bind({});

SimpleSlider.args = {};
