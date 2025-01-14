import React from 'react';
import './Element.css';
import {Link, useLocation} from "react-router-dom";

const Element = ({href, text}) => {
    const location = useLocation();
    const isActive = href === '/'
        ? location.pathname === '/'
        : location.pathname.startsWith(href);
    return (
        <div className="element-container">
            <Link to={href} className={`element-link ${isActive ? 'element-link-active' : ''}`}>
                {text}
            </Link>
        </div>
    );
};

export default Element;