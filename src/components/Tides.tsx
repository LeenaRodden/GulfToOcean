import React, { useEffect } from 'react';
import {server} from  './constants';


interface tidesProps {
    tides: string;
}

export function Tides(props: tidesProps) {
    return (
        <div className="section">
            <h4>Tides</h4>
            <hr />

            <iframe src={server + "/Beach/TideChart?sid=" + props.tides } width="400" height="400"></iframe>
        </div>
    )


}