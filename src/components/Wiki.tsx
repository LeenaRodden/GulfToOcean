import React, { useState, useEffect, ReactFragment } from 'react';
import { server } from './constants';

interface wikiProps {
    beachName: string;
    state: string;
}

export function Wiki(props: wikiProps) {
    const [wiki, setWiki] = useState(null as any);
    const query = props.beachName;

    useEffect(
        () => {
            if (wiki == null) {
                fetch(server + "/beach/getwiki?query=" + query + "&state=" + props.state)
                    .then(response => response.json())
                    .then(data => processWiki(data))
                    .catch(err => processError(err))
            }

        }, []

    )

    function processWiki(obj: any) {
        setWiki(obj);
    }

    function processError(err: any) {
        console.log(err);

    }

    
    if (wiki == null) { return (<div>Loading</div>) }
    if (wiki == "") { return (<div></div>) }

    let obj = JSON.parse(wiki);

    let arrExtracts: JSX.Element[] = [];
    if (obj.query != null) {

        if (obj.query.pages != null) {
            for (let key in obj.query.pages) {
                if (key == "-1") {
                    continue;
                }
                let extract = obj.query.pages[key].extract;
                let seeAlso = extract.lastIndexOf('<span id=\"See_also\">');
                if (seeAlso >= 0) {
                    extract = extract.substring(0, seeAlso);
                }
                let gallery = extract.lastIndexOf('<span id=\"Gallery\">')
                if (gallery >= 0) {
                    extract = extract.substring(0, gallery);
                }
                let external = extract.lastIndexOf('<span id=\"External_links\">');
                if (external >= 0) {
                    extract = extract.substring(0, external);
                }
                let references = extract.lastIndexOf('<span id=\"References\">');
                if (references >= 0) {
                    extract = extract.substring(0, references);
                }

                if (extract.length > 2000) {
                    extract = extract.substring(0, 2000);
                }

                let div = (
                    <div>
                        <div className="extract"
                            dangerouslySetInnerHTML={{ __html: extract }}
                        />
                        <a href={'http://en.wikipedia.org/?curid=' + key}>Wikipedia</a>
                    </div>
                );
                arrExtracts.push(div);

            }

        }
    }


    return (
        <div className="container">
            {arrExtracts[0] }
        </div>
        
        )
}