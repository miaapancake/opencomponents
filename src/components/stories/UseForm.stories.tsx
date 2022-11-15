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

const Error = (error: string) => (
    <div style={{ color: "Red", fontSize: "1.1em", marginTop: "10px", fontFamily: "sans-serif" }}>
        {error}
    </div>
);

export const Simple = () => {
    const { register, submit, errors } = useForm();

    return (
        <form {...submit((data) => alert(JSON.stringify(data)))}>
            <TextInput
                placeholder="username"
                {...register("name", { value: "", required: true })}
            />
            {errors["name"]?.map(Error)}
            <TextInput
                placeholder="password"
                {...register("password", { value: "", required: true })}
                type="password"
            />
            {errors["password"]?.map(Error)}
            <Submit>Sign In</Submit>
        </form>
    );
};
