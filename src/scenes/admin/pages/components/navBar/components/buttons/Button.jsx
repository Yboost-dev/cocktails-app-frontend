import React from 'react';
import './Button.scss';
import {Link, useLocation} from "react-router-dom";

const Button = ({text, link}) => {
    const location = useLocation();
    const isActive = link === '/'
        ? location.pathname === '/'
        : location.pathname.startsWith(link);
    return (
        <Link to={link} className={`btn-nav ${isActive ? 'element-link-active' : ''}`}>
            <i></i>
            <span>{text}</span>
        </Link>
    );
};

export default Button;