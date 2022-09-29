import React, { useState} from 'react';

interface menuProps {
    setMain(name: string): any;
}


export function Menu(props: menuProps) {


    return (
        <div className="leftPanel divNav">
            <div className="logo"><h5>Gulf to Ocean<br />Beach Information</h5></div>
            <a onClick={() => handleClick("Home") }>Home</a><br />
            <a onClick={() => handleClick("Beach")}>Beaches</a><br />
            <a onClick={() => handleClick("Blog")} >Blog</a><br />
            <a onClick={() => handleClick("ContactUs")}>Contact Us</a>
        </div>
    )

    function handleClick(main: string) {
        props.setMain(main);
        let btnClose = document.getElementById("btnClose");
        if (btnClose != null) {
            btnClose.click();
        }

    }
}


