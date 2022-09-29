import React, { useState, useEffect } from 'react';
import { server } from './constants';

export function Header(props: any) {
    const [data, setData] = useState<string>("");

    useEffect(
        () => {
            fetch(server + "/home/header")
                .then(response => response.text())
                .then(data => processData(data))
                .catch(err => processData(err))

        }
        , [data, setData])

    if (data == "") {
        return <h2>Loading</h2>
    }

    function processData(html: string) {
        setData(html);
    }

    return (<div 
        dangerouslySetInnerHTML={{ __html: data }}
    />);
}