import { useState, useEffect } from 'react';

import Link from "next/link";
import { BsCollection, BsGithub, BsLinkedin } from "react-icons/bs";
import Contact from "../contact";

const Footer = () => {
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
        console.log(window.innerWidth);
        setMobile(window.innerWidth < 620);
    }, []);

    return (
        <div className="fixed bottom-0 mt-6 mb-6 lg:mb-20 w-full text-gray-500">
            <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-2">
                <div className="flex items-center gap-1">
                    <span style={{ margin: '0', border: '1px solid #ccc', borderRadius: '4px', padding: '4px 8px', background: '#f0f0f0', fontSize: '10px' }}>Ctrl</span>
                    <p style={{ fontSize: '12px' }}>+</p>
                    <span style={{ margin: '0', border: '1px solid #ccc', borderRadius: '4px', padding: '4px 8px', background: '#f0f0f0', fontSize: '10px' }}>K</span>
                </div>
                to open Commands
            </div>
            <div className="fixed bottom-0 mt-6 lg:mt-20 mb-6 w-full text-gray-500">
                <div className="container mx-auto flex items-center justify-around lg:justify-between">
                    <div className="flex items-center space-x-1">
                        <p style={ mobile ? { fontSize: '0.7em' } : { }}>Javier Cuenca Gento</p>
                        <Link aria-label="Privacy"  href="/privacy">
                            <p style={ mobile ? { fontSize: '0.7em' } : { }}>© {new Date().getFullYear()}</p>
                        </Link>
                        <p style={ mobile ? { fontSize: '0.7em' } : { }}>Donkey Code</p>
                    </div>
                    <div className="flex gap-2 lg:gap-6">
                        <Link aria-label="Catalog"  href="/uicatalog">
                            <BsCollection size={20} className="transition-colors duration-100 hover:text-white" />
                        </Link>
                        <Contact />
                        <a aria-label="GitHub" href="https://github.com/jcuencagento" target="_blank" rel="noreferrer">
                            <BsGithub size={20} className="transition-colors duration-100 hover:text-white" />
                        </a>
                        <a aria-label="Linkedin" href="https://www.linkedin.com/in/javiercuencagento/" target="_blank" rel="noreferrer">
                            <BsLinkedin size={20} className="transition-colors duration-100 hover:text-white" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
