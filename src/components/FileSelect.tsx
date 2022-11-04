import styled from "@emotion/styled";
import { filesize } from "filesize";
import React, { useRef } from "react";

import UploadIcon from "../icons/upload-icon.svg";

import Button from "./Button";
import { useTheme } from "./contexts/ThemeContext";
import { InputProps as BaseInputProps } from "./helpers";
import useFileSelect from "./hooks/useFileSelect";
import Box from "./primitives/Box";

const StyledUploadIcon = styled(UploadIcon)(() => {
    const theme = useTheme();

    return {
        width: 24,
        height: 24,
        fill: theme.textPrimaryColor,
        verticalAlign: "middle",
        marginRight: 5,
    };
});

const StyledFileInput = styled(Box)<{ dragging?: boolean }>(({ dragging }) => {
    const theme = useTheme();

    return {
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden",
        minHeight: 150,
        borderStyle: dragging ? "dashed" : "solid",
        backgroundColor: dragging ? "rgba(0,0,0,.05)" : undefined,
        color: theme.textPrimaryColor,
        fontFamily: theme.defaultFont,
    };
});

const StyledFileInputItem = styled(Box)({
    boxSizing: "border-box",
    margin: "10px 0px",
    width: "100%",
    backgroundColor: "rgba(0,0,0,.05)",
    justifyContent: "center",
});

const StyledFileInputItemLabel = styled(Box)({
    overflow: "hidden",
    textAlign: "left",
    boxSizing: "border-box",
    width: "100%",
    userSelect: "none",
    "& span": {
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
});

const StyledFileSizeCounter = styled(Box)(() => {
    const theme = useTheme();

    return {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: theme.primaryColor,
        color: theme.textPrimaryColorContrast,
    };
});

export class SelectedFile {
    file: File;
    hash: string;

    constructor(file: File, hash: string) {
        this.file = file;
        this.hash = hash;
    }
}

export type InputProps = BaseInputProps<File[]>;

export interface FileSelectProps {
    allowedMimeTypes?: string[];
    multiple?: boolean;
}

const FileSelect = (props: FileSelectProps & InputProps) => {
    const fileSelectRef = useRef<HTMLInputElement>();
    const { dragging, onChange, setDragging, value } = useFileSelect(props);

    return (
        <StyledFileInput
            padding
            bordered
            rounded
            center
            dragging={dragging}
            className={props.className}
            onDrop={(e) => {
                e.preventDefault();
                onChange([...e.dataTransfer.files]);
                setDragging(false);
            }}
            onDragOver={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setDragging(true);
            }}
            onDragExit={() => setDragging(false)}
        >
            <input
                name={props.name}
                onChange={(e) => onChange([...e.target.files])}
                ref={fileSelectRef}
                type="file"
                hidden={true}
                accept={props.allowedMimeTypes?.join(",")}
                multiple={props.multiple}
            />
            {value?.map((file) => (
                <StyledFileInputItem key={file.name + file.size} rounded flex>
                    <StyledFileInputItemLabel center padding>
                        <span>{file.name}</span>
                    </StyledFileInputItemLabel>
                    <StyledFileInputItemLabel center style={{ maxWidth: "100px" }} padding>
                        <span>{filesize(file.size).toString()}</span>
                    </StyledFileInputItemLabel>
                    <Button
                        onClick={() =>
                            props.onChange(
                                value.length > 1
                                    ? (value.filter(
                                          (x) => x.name + x.size !== file.name + file.size
                                      ) as any)
                                    : undefined
                            )
                        }
                        style={{ width: 25, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    >
                        x
                    </Button>
                </StyledFileInputItem>
            ))}
            <Button onClick={() => fileSelectRef.current?.click()}>
                <StyledUploadIcon />
                <span style={{ verticalAlign: "middle" }}>Select or drop file</span>
            </Button>
            {value.length > 1 ? (
                <StyledFileSizeCounter padding rounded>
                    {filesize(value.reduce((prev, cur) => prev + cur.size, 0)).toString()}
                </StyledFileSizeCounter>
            ) : (
                <></>
            )}
        </StyledFileInput>
    );
};

export default FileSelect;
