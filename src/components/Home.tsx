import React, { useState, useEffect } from 'react';
import { server } from './constants';
export function Home(props: any) {
    const [data, setData] = useState<string>("");

    useEffect(
        () => {
        fetch(server + "/home/index?partial=true")
            .then(response => response.text())
            .then(data => processData(data))
            .catch(err => processData(err))
        }, [data, setData])

    if (data == "") {
     
        return <div className="centerPanel divMain"><h2>Loading</h2></div>
    }

    function processData(html: string) {
        setData(html);
    }

    return (<div className="centerPanel divMain"
        dangerouslySetInnerHTML={{ __html: data }}
    />);
}