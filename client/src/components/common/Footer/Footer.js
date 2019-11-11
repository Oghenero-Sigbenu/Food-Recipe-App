import React from 'react';

import "./Footer.css";

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="cs-btn">
                <input type="email" name="email" />
                <button className="c-btn">Notify Me</button>
                </div>
            </div>
            <footer>
                <p>
                &copy; 2019 Designed Oghenero Sigbenu. All rights reserverd
                 </p>
                <ul>
                    <li>
                        Terms of Service
                    </li>
                    <li>
                        Privacy Policy
                    </li>
                </ul>

            </footer>
        </>
    );
};

export default Footer;