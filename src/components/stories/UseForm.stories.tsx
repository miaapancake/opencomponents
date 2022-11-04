import { ComponentMeta } from "@storybook/react";
import React, { Fragment } from "react";

import useForm from "../hooks/useForm";
import Submit from "../Submit";
import TextInput from "../TextInput";

export default {
    title: "OpenComponents/Components/UseForm",
    component: Fragment,
    decorators: [
        (Story) => (
            <div style={{ margin: "3em auto", maxWidth: "400px", textAlign: "center" }}>
                {Story()}
            </div>
        ),
    ],
} as ComponentMeta<typeof Fragment>;

export const Simple = () => {

    const { register, submit } = useForm();

    return (
        <form {...submit((data) => alert(JSON.stringify(data)))}>
            <TextInput placeholder="username" {...register("name")} />
            <TextInput placeholder="password" {...register("password")} type="password" />
            <Submit>Sign In</Submit>
        </form>
    );

}