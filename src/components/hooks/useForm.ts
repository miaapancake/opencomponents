import { FormEvent, useCallback, useState } from "react";

export default function useForm<DataType>() {

    const [data, setData] = useState<Partial<DataType>>({});

    const register = useCallback(<T>(name: string) => ({
        onChange: (val: T) => {
            setData({...data, [name]: val});
        },
        value: data[name],
        style: {
            margin: "10px 0px"
        }
    }), [data, setData]);

    const submit = useCallback((cb: (data: Partial<DataType>) => void) => ({
        onSubmit: (e: FormEvent) => {
            e.preventDefault();
            cb(data);
        }
    }), [data]);

    return {
        submit,
        register,
        data
    }

}