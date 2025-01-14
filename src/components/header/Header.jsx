import React from 'react';
import './Header.css';
import Element from "./components/elements/Element";
import Search from "./components/search/Search";

const Header = () => {
    return (
        <header className="header-container">
            <div className="header-logo">
                <img src="logo.png" alt=""/>
            </div>
            <div className="header-elements">
                <Element href="/" text="Accueil"/>
                <Element href="/cocktails" text="Les cocktails"/>
                <Element href="/softs" text="Un peu de soft"/>
                <Element href="/shooters" text="Les shooters"/>
            </div>
            <div className="header-search">
                <Search/>
            </div>
        </header>
    );
};

export default Header;