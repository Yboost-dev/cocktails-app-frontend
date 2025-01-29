import React from 'react';
import './Header.scss';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className="header-admin">
            <div className="header-admin-container">
                <Link to="/admin/auth/login" className="btn-admin-link">
                    <span>Déconnexion</span>
                </Link>
            </div>
        </header>
    );
};

export default Header;