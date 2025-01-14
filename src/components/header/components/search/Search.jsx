import React from 'react';
import './Search.scss';

const Search = () => {
    return (
        <div className="search-container">
            <input type="text" placeholder="Rechercher" className="search-input"/>
            <i className="fas fa-search search-icon"></i>
        </div>
    );
};
export default Search;