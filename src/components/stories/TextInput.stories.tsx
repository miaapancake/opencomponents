import TextInput, { TextInputProps } from '../TextInput';
import React, { useCallback, useEffect, useState } from 'react';
import './styles/global.scss';

export default {
    title: "Text Input",
    component: TextInput
}


const Template = (args: TextInputProps) => {
    const [text, setText] = useState(args.value);

    useEffect(() => {
        setText(args.value);
    }, [args.value]);

    return (<TextInput
        style={args.style}
        value={text}
        maxLength={args.maxLength}
        onChange={setText}
        type={args.type}
    />)
}

export const Normal = Template.bind({});

Normal.args = {
    value: 'Some String',
    style: {
        maxWidth: '300px'
    }
};