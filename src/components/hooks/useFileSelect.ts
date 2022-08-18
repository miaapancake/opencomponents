import { Buffer } from "buffer";

import { useCallback, useState } from "react";

import { FileSelectProps, SelectedFile } from "../FileSelect";
import { compareMime } from "../helpers";

export default function useFileSelect(props: FileSelectProps) {
    const [dragging, setDragging] = useState<boolean>(false);

    const onChange = useCallback(
        async (files: File[]) => {
            // Filter files by the allowed mimetypes
            if (props.allowedMimeTypes)
                files = files.filter(
                    (x) => props.allowedMimeTypes.findIndex((y) => compareMime(y, x.type)) !== -1
                );

            // If no files made it through checks then
            // return and add no files to the select
            if (!files.length) return;

            // Create a hash set of the current values
            const hashes = new Set(props.value?.map((x) => x.hash));

            const parsedFiles = (
                await Promise.all(
                    files.map(async (file) => {
                        // Get the arraybuffer representing the data from the uploaded file
                        const data = await file.arrayBuffer();

                        // Generate a hash based on file contents
                        const hash = Buffer.from(
                            await crypto.subtle.digest("SHA-256", data)
                        ).toString("hex");

                        // If the hash is already in the file select's list do not add the file
                        if (hashes.has(hash)) return undefined;

                        // Otherwise add the current file hash to the hash set to
                        // prevent repetitive files uploads in transition
                        hashes.add(hash);

                        return new SelectedFile(file, hash);
                    })
                )
            ).filter((x) => x); // Filter out the undefined's

            // If none of the files made it through parsing add nothing
            if (!parsedFiles.length) return;

            if (props.multiple) {
                props.onChange([...(props.value ?? []), ...parsedFiles]);
            } else {
                props.onChange([parsedFiles[0]]);
            }
        },
        [props]
    );

    return {
        onChange,
        dragging,
        setDragging,
    };
}
