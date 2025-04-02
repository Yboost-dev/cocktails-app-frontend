import React from 'react';
import './Header.scss';
import Element from "./components/elements/Element";
import Search from "./components/search/Search";

const Header = () => {
    return (
        <header className="header-container">
            <div className="header-logo">
                <img src="/img/logo.png" alt=""/>
            </div>
            <div className="header-elements">
                <Element href="/" text="Accueil"/>
                <Element href="/cocktail" text="Les cocktails"/>
                <Element href="/soft" text="Un peu de soft"/>
                <Element href="/shooter" text="Les shooters"/>
            </div>
            <div className="header-search">
                <Search/>
            </div>
        </header>
    );
};

export default Header;