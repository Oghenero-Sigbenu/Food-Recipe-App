import React from 'react';

import "./Footer.css";

const Footer = () => {
    return (
        <>
            <div className="footer">
                <ul className="company">
                    <h2>Company</h2>
                    <li>About</li>
                    <li>Press</li>
                    <li>Blog</li>
                    <li>Careers</li>
                </ul>

                <ul className="information">
                    <h2>Information</h2>
                    <li>Our Story</li>
                    <li>Recipes</li>
                    <li>Contact Us</li>
                    <li>Resources</li>
                </ul>

                <div className="subscribe">
                    <h2>Subscribe Now</h2>
                    <input type="email" name="email" placeholder="your email" />
                    <button>Subscribe Now</button>
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