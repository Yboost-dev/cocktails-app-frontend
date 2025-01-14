import React from 'react';
import './ContentNotFound.scss';
import {Link} from "react-router-dom";

const ContentNotFound = () => {
    return (
        <div className="content-not-found">
            <h1>Oups !</h1>
            <h2>La page que vous recherchez semble introuvable.</h2>
            <p>Code d'erreur : 404</p>
            <div className="link-back">
                <Link to="/" className="link-back-link">
                    Page d'accueil
                </Link>
            </div>
        </div>
    );
};

export default ContentNotFound;