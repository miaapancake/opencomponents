import { useCallback, useMemo, useState } from "react";

import { FileSelectProps, InputProps } from "../FileSelect";
import { compareMime } from "../helpers";

export default function useFileSelect({
    onChange: parentOnChange,
    value,
    multiple,
    allowedMimeTypes,
}: FileSelectProps & InputProps) {
    const [dragging, setDragging] = useState<boolean>(false);

    const normalizedValue: File[] = useMemo(
        () => (value ? (Array.isArray(value) ? value : [value]) : []),
        [value]
    );

    const onChange = useCallback(
        async (files: File[]) => {
            // Filter files by the allowed mimetypes
            if (allowedMimeTypes)
                files = files.filter(
                    (x) => allowedMimeTypes.findIndex((y) => compareMime(y, x.type)) !== -1
                );

            // If no files made it through checks then
            // return and add no files to the select
            if (!files.length) return;

            // Create a hash set of the current values
            const hashes = new Set(normalizedValue.map((x) => x.name + x.size));

            const parsedFiles = (
                await Promise.all(
                    files.map(async (file) => {
                        // If the hash is already in the file select's list do not add the file
                        if (hashes.has(file.name + file.size)) return undefined;

                        // Otherwise add the current file hash to the hash set to
                        // prevent repetitive files uploads in transition
                        hashes.add(file.name + file.size);

                        return file;
                    })
                )
            ).filter((x) => x); // Filter out the undefined's

            // If none of the files made it through parsing add nothing
            if (!parsedFiles.length) return;

            if (multiple) parentOnChange([...normalizedValue, ...parsedFiles]);
            else parentOnChange([parsedFiles[0]]);
        },
        [parentOnChange, allowedMimeTypes, normalizedValue, multiple]
    );

    return {
        onChange,
        dragging,
        setDragging,
        value: normalizedValue,
    };
}
