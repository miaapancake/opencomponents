import { ComponentMeta } from "@storybook/react";
import React, { useState } from "react";

import FileSelect, { FileSelectProps } from "../FileSelect";

export default {
    title: "OpenComponents/Components/FileSelect",
    component: FileSelect,
    decorators: [
        (Story) => (
            <div style={{ margin: "3em auto", maxWidth: "400px", textAlign: "center" }}>
                {Story()}
            </div>
        ),
    ],
    argTypes: {
        value: {
            description: `The selected files of the fileinput,
by default this is an array of files only holding a single file.\n
Adding the "multiple" flag to the component will allow for multiple files to be selected!`,
            type: {
                name: "array",
                value: {
                    name: "other",
                    value: "File",
                },
                summary: "File[]",
            },
            control: false,
        },
        onChange: {
            description: `The callback called when the selected files of the
fileinput are changed, by default this is an array of files only holding a single file.\n
Adding the "multiple" flag to the component will allow for multiple files to be selected!`,
            type: {
                name: "function",
                summary: "(files: File[]) => void",
            },
            control: false,
        },
        multiple: {
            description: "Flag that indicates if multiple files can be selected",
            type: "boolean",
            defaultValue: false,
        },
    },
} as ComponentMeta<typeof FileSelect>;

export const Simple = (args: FileSelectProps) => {
    const [value, setValue] = useState<File[]>();

    return <FileSelect {...args} value={value} onChange={setValue} />;
};

export const MultipleFiles = (args: FileSelectProps) => {
    const [value, setValue] = useState<File[]>();

    return <FileSelect {...args} multiple value={value} onChange={setValue} />;
};
