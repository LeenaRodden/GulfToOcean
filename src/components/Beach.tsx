import React, { useState, useReducer, useEffect } from 'react';
import { BeachDetails } from './BeachDetails';
import { server } from './constants';

export function Beach(props:any) {


    const initialDetails = null as any;

    function reducer(_: any, newState: any) {
        return newState;
    }

    function setSelectedBeachReducer(_: any, newState: any) {
        return newState;
    }

    const [beaches, setBeaches] = useReducer(reducer, initialDetails);
    const [selectedBeach, setSelectedBeach] = useReducer(setSelectedBeachReducer, initialDetails);

    useEffect(
        () => {
            fetch(server + "/beach/index?partial=true")
                .then(response => response.json())
                .then(data => processData(data))
                .catch(err => processData(err))

                

        }
        , [])

    if (beaches == null) {
        return <div className="centerPanel divMain"><h2>Loading</h2></div>
    }

    function processData(json: any) {
        setBeaches(json);
    }

    if (selectedBeach != null) {
        return (
            <BeachDetails selectedBeach={selectedBeach} setSelectedBeach={setSelectedBeach} setClicked={props.setClicked} clicked={false }  />
            )
    }


    return (
        <div className="centerPanel divMain regions">
            <h1>All Beaches</h1>
            <Regions beaches={beaches} />

        </div>
    )

    function Regions(props: any) {
        let arr = [];
        let regions = props.beaches.regions;
        let states = props.beaches.states;
        let model = props.beaches.model;
        for (let i = 0; i < states.length; i++) {
            arr.push(<h2 key={"state" + i}>{states[i]} Beaches</h2>)
            for (let j = 0; j < regions.length; j++) {
                if (regions[j].RegionStatename == states[i]) {
                    arr.push(<h3 key={"region" + j}>{regions[j].RegionName}</h3>);

                    arr.push(<p key={"regiont" + j}dangerouslySetInnerHTML={{ __html: regions[j].RegionText }} />)
                    for (let k = 0; k < model.length; k++) {
                        if (model[k].Region == regions[j].RegionId) {
                            arr.push(<BeachLink key={"beach" + k } beach={model[k]} />)
                        }
                    }
                }

            }
        }

        return <div>{arr}</div>;
    }

    /**
    * @deprecated The method worked with JsonConvert way of serializiation and should not be used
    */
    function States(props: any) {
        let ststr = props.beaches.states.slice(1, -1);

        let stobj = ststr.split(',');
        for (let i = 0; i < stobj.length; i++) {
            stobj[i] = stobj[i].slice(1, -1);
        }

        let regstr = props.beaches.regions.slice(1, -1);

        let model = props.beaches.model;

        return (
            <div>
                <h1>States</h1>
                {JSON.stringify(regstr)}
                {stobj.map((p: string) => (
                    <div>
                        <State st={p} />
                        {model.filter((f:any)=>f.stateName==p).map((b: any) => <BeachLink beach={b} />)}
                    </div>
                ))}
                {JSON.stringify(model)}
             
            </div>
        );
    }

    function State(props: any) {
        return (<h5>{props.st}</h5>)
    }

    function BeachLink(props: any) {
        return (<div><a className="BeachLink" onClick={() => handleBeachLinkClick(props.beach)}>{props.beach.BeachName}</a></div>)
    }

    function handleBeachLinkClick(beach: any) {
        try {
            setTimeout(() => { setSelectedBeach(beach); }, 50);
            
        } catch (err) {
            console.error(err);
        }

    }

}