import React, { useRef } from "react";

import { ApplyInputFormContext, classNames, InputProps } from "./helpers";
import useFileSelect from "./hooks/useFileSelect";

export class SelectedFile {
    file: File;
    hash: string;

    constructor(file: File, hash: string) {
        this.file = file;
        this.hash = hash;
    }
}

export interface FileSelectProps extends InputProps<SelectedFile[]> {
    allowedMimeTypes?: string[];
    multiple?: boolean;
}

const FileSelect = (props: FileSelectProps) => {
    const fileSelectRef = useRef<HTMLInputElement>();
    const { dragging, onChange, setDragging } = useFileSelect(props);

    return (
        <div
            style={{ backgroundColor: dragging ? "red" : undefined, ...props.style }}
            className={classNames(
                "oc-input",
                "oc-file-select",
                props.className,
                props.error && "oc-error"
            )}
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
            <span className="oc-input-text" onClick={() => fileSelectRef.current?.click()}>
                Select or drop file
            </span>
            {props.error ? <div className="oc-error-message">{props.error}</div> : <></>}
            {props.value?.map(({ file, hash }) => (
                <div
                    onClick={() =>
                        props.onChange(
                            props.value.length > 1
                                ? props.value.filter((x) => x.hash !== hash)
                                : undefined
                        )
                    }
                    className="oc-file-item"
                    key={hash}
                >
                    <span>{file.name}</span>
                </div>
            ))}
        </div>
    );
};

export default ApplyInputFormContext(FileSelect);
