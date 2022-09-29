import React, { useState, useEffect } from 'react';
import { server } from './constants';

interface conditionsProps {
    beach: number;
}

export function CurrentConditions(props: conditionsProps) {
    const [model, setModel] = useState(null as any);

    useEffect(
        () => {
            if (model == null) {
                fetch(server + "/beach/getcurrentconditions?beach=" + props.beach)
                    .then(response => response.json())
                    .then(data => processConditions(data))
                    .catch(err => processError(err))
            }

        }, []

    )

    function processConditions(obj:any) {
        setModel(obj);
    }

    function processError(err:any){
        console.log(err);
        
    }

    if (model != null) {
        return (
            <div>
                <hr />
                <h3>
                    {model.Description}
                </h3>
                <dl className="dl-horizontal">
                    <dt>
                        Temperature
                    </dt>

                    <dd>
                        {model.Temperature}&#8457;
                    </dd>
                    <dt>
                        Humidity
                    </dt>
                    <dd>
                        {model.Humidity}%
                    </dd>
                    <dt>
                        Pressure
                    </dt>
                    <dd>
                        {model.Pressure} hPa
                    </dd>
                    <dt>
                        Wind
                    </dt>
                    <dd>
                        {model.WindSpeed}MPH
                        {model.WindDeg}
                    </dd>
                    <dt>
                        Sunrise
                    </dt>

                    <dd>
                        {model.Sunrise}
                    </dd>

                    <dt>
                        Sunset
                    </dt>

                    <dd>
                        {model.Sunset}
                    </dd>
                </dl>
                <div>Weather data provided by <a href="http://openweathermap.org">OpenWeatherMap</a></div>
            </div>
        )
    }


    return null;
}