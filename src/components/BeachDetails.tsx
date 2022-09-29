import React, { useState, useEffect, useReducer } from 'react';
import { server } from './constants';
import { CurrentConditions } from './CurrentConditions';
import { Tides } from './Tides';
import { UploadedBeachImages } from './UploadedBeachImages';
import { Pictures } from './Pictures';
import { Wiki } from './Wiki';

interface detailsProps {
    selectedBeach: any;
    setSelectedBeach(beach: object | null): any;
    setClicked(clicked: boolean): any;
    clicked: boolean;
}

export function BeachDetails(props: detailsProps) {
    let model = props.selectedBeach;
    const initialDetails = null as any;

    function reducer(_:any, newState:any) {
        return newState;
    }


    const [details, setDetails] = useReducer(reducer, initialDetails);

    if (props.clicked) {
        closeBeach();
    }

    useEffect(
        () => {
            if (details == null) {
                fetch(server + "/beach/getdetails?id=" + model.BeachId)
                    .then(response => response.json())
                    .then(data => processDetails(data))
                    .catch(err => alert(err))            }

        }, [] 

    )

    function processDetails(obj:any) {
        setDetails(obj);
    }


    try {

       // let srcUrl = "https://www.mapquest.com/embed?" + details.mapquestQueryString;

        return (
            <div className="details">
                <button className="closeButton" id="btnClose" onClick={closeBeach}>X</button>
                <div className="section" id="divInfo">
                    <h2>{model.BeachName}</h2>
                    <hr />
                    <dl className="dlhorizontal">
                        {model.BeachWater == "" ? null : <><dt>Water type</dt><dd>{model.BeachWater}</dd></>}
                        {model.Parking == "" ? null : <><dt>Parking</dt><dd>{model.Parking}</dd></>}
                        {model.Surfing == "" ? null : <><dt>Surfing</dt><dd>{model.Surfing}</dd></>}
                        {model.Piers == "" ? null : <><dt>Piers</dt><dd>{model.Piers}</dd></>}
                        {model.DogsAllowed == "" ? null : <><dt>Dogs Allowed</dt><dd>{model.DogsAllowed}</dd></>}
                        {model.CampingAllowed == "" ? null : <><dt>Camping Allowed</dt><dd>{model.CampingAllowed}</dd></>}
                        {model.Restaurants == "" ? null : <><dt>Restaurants</dt><dd>{model.Restaurants}</dd></>}
                        {model.Bars == "" ? null : <><dt>Bars</dt><dd>{model.Bars}</dd></>}
                        {model.Hotels == "" ? null : <><dt>Hotels</dt><dd>{model.Hotels}</dd></>}
                        {model.BathRooms == "" ? null : <><dt>Public Restrooms</dt><dd>{model.Bathrooms}</dd></>}
                        {model.Showers == "" ? null : <><dt>Showers</dt><dd>{model.Showers}</dd></>}
                        {model.Boardwalk == "" ? null : <><dt>Boardwalk</dt><dd>{model.Boardwalk}</dd></>}
                        {model.BeachDescription == "" ? null : <><dt>Boardwalk</dt><dd><Description html={model.BeachDescription} /></dd></>}
                    </dl>
                    <p><Description html={model.Text} /></p>
                </div>
                <div className="section" id="divImages">
                    {details == null ? <h2>Loading</h2> : <UploadedBeachImages details={details} />}
                    {details == null ? <h2>Loading</h2> : <Pictures details={details} />}
                </div>
                <div className="section">
                    <h4>Current Conditions in {model.BeachName}</h4>
                    {details == null ? <div className='currentLoading'><h2>Loading</h2></div> : <CurrentConditions beach={model.BeachId} />}
                </div>
                <div className="section" id="divWiki">
                    {details == null ? <h2>Loading</h2> : <Wiki beachName={model.BeachName} state={model.State } />}
                </div>
                {/*<div className="section">*/}
                {/*    <h4>Map</h4>*/}
                {/*    <a href={srcUrl}>{srcUrl }</a>*/}
                {/*    <hr />*/}
                {/*    <div>*/}
                {/*        {details == null ? <h2>Loading</h2> : <iframe src={srcUrl} width="640" height="480"></iframe>}*/}
                {/*    </div>*/}
                {/*</div>*/}
                {details != null && details.tides != "" ? <Tides tides={details.tides} /> : null}


            </div>
        )
    } catch (err) {
        alert(err);
        return(<h1>Error Rendering Page</h1>)
    }


    function closeBeach() {
        props.setSelectedBeach(null);
        setDetails(null);

        props.setClicked(false);
    }

    function Description(props: any) {
        return (
            <span 
                dangerouslySetInnerHTML={{ __html: props.html }}
            />
            )
    }
}

