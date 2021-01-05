import React from "react";
import './Footer.css';

function Footer(){

    const currentYear = new Date().getFullYear()


    return(
        <footer>
            <p>Beth Arnold copyright © {currentYear} </p>
        </footer>
    )
};

export default Footer;