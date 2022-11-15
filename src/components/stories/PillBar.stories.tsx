import styled from "@emotion/styled";
import { ComponentMeta } from "@storybook/react";
import React, { useState } from "react";

import PillBar, { Pill, PillBarProps } from "../PillBar";

import AutoIcon from "./icons/automobile-icon.svg";
import BusIcon from "./icons/bus-icon.svg";
import CyclingIcon from "./icons/cycling-icon.svg";
import HikeIcon from "./icons/hike-icon.svg";
import PlaneIcon from "./icons/plane-icon.svg";
import TrainIcon from "./icons/tram-icon.svg";

const StyledAutoIcon = styled(AutoIcon)({ width: 16, height: 16, marginRight: 8 });
const StyledPlaneIcon = styled(PlaneIcon)({ width: 16, height: 16, marginRight: 8 });
const StyledBusIcon = styled(BusIcon)({ width: 16, height: 16, marginRight: 8 });
const StyledHikeIcon = styled(HikeIcon)({ width: 16, height: 16, marginRight: 8 });
const StyledCyclingIcon = styled(CyclingIcon)({ width: 16, height: 16, marginRight: 8 });
const StyledTrainIcon = styled(TrainIcon)({ width: 16, height: 16, marginRight: 8 });

export default {
    title: "OpenComponents/Components/PillBar",
    component: PillBar,
    decorators: [
        (Story) => (
            <div style={{ margin: "3em auto", maxWidth: "500px", textAlign: "center" }}>
                {Story()}
            </div>
        ),
    ],
    argTypes: {
        onChange: {
            control: false,
        },
    },
} as ComponentMeta<typeof PillBar>;

const Template = (args: PillBarProps) => {
    const [value, setValue] = useState<string[]>();

    return (
        <PillBar {...args} onChange={setValue} value={value}>
            <Pill value="walk">
                <StyledHikeIcon />
                <span>Walk</span>
            </Pill>
            <Pill value="bike">
                <StyledCyclingIcon />
                <span>Bike</span>
            </Pill>
            <Pill value="bus">
                <StyledBusIcon />
                <span>Bus</span>
            </Pill>
            <Pill value="train">
                <StyledTrainIcon />
                <span>Train</span>
            </Pill>
            <Pill value="car">
                <StyledAutoIcon />
                <span>Car</span>
            </Pill>
            <Pill value="plane">
                <StyledPlaneIcon />
                <span>Plane</span>
            </Pill>
        </PillBar>
    );
};

export const Simple = Template.bind({});
export const Scrollable = Template.bind({});

Scrollable.args = {
    gradientBase: "#fff",
    scrollable: true,
};
