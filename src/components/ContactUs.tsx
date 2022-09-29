import React, { useState, useEffect } from 'react';
import { server } from './constants';

export function ContactUs() {
    const [contactForm, setContactForm] = useState(null as any);

    useEffect(
        () => {
            if (contactForm == null) {
                fetch(server + "/ContactUs?partial=true")
                    .then(response => response.text())
                    .then(data => processForm(data))
                    .catch(err => processError(err))
            }

        }, []

    )

    if (contactForm == null) {
        return (<h2>Loading</h2>)
    }

    return (
        <div className="centerPanel divMain contact"
            dangerouslySetInnerHTML={{ __html: contactForm }}
        />
        
        )


    function processForm(obj: any) {
        setContactForm(obj);
    }

    function processError(err: any) {
        console.log(err);

    }

}