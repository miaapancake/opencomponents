import { ComponentMeta } from "@storybook/react";
import React from "react";

import TabView from "../TabView";

export default {
    title: "OpenComponents/Components/TabView",
    component: TabView,
    decorators: [
        (Story) => (
            <div style={{ margin: "3em auto", maxWidth: "800px", textAlign: "center" }}>
                {Story()}
            </div>
        ),
    ],
} as ComponentMeta<typeof TabView>;

export const Simple = () => (
    <TabView defaultSelected={"1"}>
        <TabView.Headers>
            <TabView.Header eventKey={"1"}>Profile</TabView.Header>
            <TabView.Header eventKey={"2"}>Privacy</TabView.Header>
            <TabView.Header eventKey={"3"}>Security</TabView.Header>
            <TabView.Header eventKey={"4"}>Billing</TabView.Header>
        </TabView.Headers>
        <TabView.Item eventKey={"1"}>Profile Settings</TabView.Item>
        <TabView.Item eventKey={"2"}>Privacy Settings</TabView.Item>
        <TabView.Item eventKey={"3"}>Security Settings</TabView.Item>
        <TabView.Item eventKey={"4"}>Billing Settings</TabView.Item>
    </TabView>
);
