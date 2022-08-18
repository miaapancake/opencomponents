import Joi from "joi";
import React from "react";

import "./styles/global.scss";
import "../styles/Form.scss";
import FileSelect from "../FileSelect";
import Form from "../Form";
import Label from "../Label";
import NumberInput from "../NumberInput";
import Select from "../Select";
import { TableProps } from "../Table";
import TextArea from "../TextArea";
import TextInput from "../TextInput";

export default {
    title: "Form",
    component: Form,
};

const TemplateWithoutFiles = ({}: TableProps) => {
    return (
        <Form style={{ maxWidth: 500 }} onSubmit={(obj) => console.log(obj)}>
            <h1>Cat Finder&#8482; Form</h1>
            <Label htmlFor="username">Username</Label>
            <TextInput validation={Joi.string().min(1).max(128).required()} name="username" />
            <Label htmlFor="password">Password</Label>
            <TextInput
                validation={Joi.string().min(8).required()}
                name="password"
                type="password"
            />
            <Label htmlFor="days">Days since your cat has been gone</Label>
            <NumberInput validation={Joi.number().min(0).max(255).required()} name="days" />
            <Label htmlFor="description">Describe where you last saw your cat</Label>
            <TextArea validation={Joi.string().min(1).max(128).required()} name="description" />
            <Label htmlFor="gender">What gender is your cat?</Label>
            <Select
                validation={Joi.string().valid("female", "male", "cat", "uwu").required()}
                name="gender"
            >
                <Select.Item key={1} label="Female" value="female" />
                <Select.Item key={2} label="Male" value="male" />
                <Select.Item key={3} label="Nyan Binary" value="cat" />
                <Select.Item key={4} label="Gender Fluiwd" value="uwu" />
            </Select>
            <Form.Submit>Submit</Form.Submit>
        </Form>
    );
};

export const WithoutFiles = TemplateWithoutFiles.bind({});

WithoutFiles.args = {};

const TemplateWithFiles = ({}: TableProps) => {
    return (
        <Form style={{ maxWidth: 500 }} onSubmit={(obj) => console.log(obj)}>
            <h1>Cat Finder&#8482; Form</h1>
            <Label htmlFor="username">Username</Label>
            <TextInput validation={Joi.string().min(1).max(128).required()} name="username" />
            <Label htmlFor="password">Password</Label>
            <TextInput
                validation={Joi.string().min(8).required()}
                name="password"
                type="password"
            />
            <Label htmlFor="days">Days since your cat has been gone</Label>
            <NumberInput validation={Joi.number().min(0).max(255).required()} name="days" />
            <Label htmlFor="description">Describe where you last saw your cat</Label>
            <TextArea validation={Joi.string().min(1).max(128).required()} name="description" />
            <Label htmlFor="gender">What gender is your cat?</Label>
            <Select
                validation={Joi.string().valid("female", "male", "cat", "uwu").required()}
                name="gender"
            >
                <Select.Item key={1} label="Female" value="female" />
                <Select.Item key={2} label="Male" value="male" />
                <Select.Item key={3} label="Nyan Binary" value="cat" />
                <Select.Item key={4} label="Gender Fluiwd" value="uwu" />
            </Select>
            <Label htmlFor="catpicture">Most recent picture of your cat</Label>
            <FileSelect name="catpicture" allowedMimeTypes={["image/*"]} />
            <Label htmlFor="gender">
                The most recent pictures sent by your CatFinder&#8482; cat colar
            </Label>
            <FileSelect multiple={true} name="otherpictures" allowedMimeTypes={["image/*"]} />
            <Form.Submit>Submit</Form.Submit>
        </Form>
    );
};

export const WithFiles = TemplateWithFiles.bind({});

WithFiles.args = {};
