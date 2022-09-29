import React, { useState } from 'react';
import { Home } from './Home';
import { Header } from './Header';
import { Footer } from './Footer';
import { Menu } from './Menu';
import { ContactUs } from './ContactUs';
import { Beach } from './Beach';
import { Blog } from './Blog';

export function Layout() {
    const [main, setMain] = useState("Home");


    return (<div id="divLayout">
        <Header />
        <Menu setMain={setMain}  />
        <DisplayMain />
        <Footer />
        </div>
    )

    function DisplayMain() {
        switch (main) {
            case "Home":
                return <Home />;
            case "ContactUs":
                return <ContactUs />;
            case "Beach":
                return <Beach  />;
            case "Blog":
                return <Blog />;
            default:
                return <div>Not Found: {main}</div>
        }
    }
}

