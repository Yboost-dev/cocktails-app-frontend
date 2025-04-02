import React from 'react';
import './Error.scss';
import { Martini, Search } from 'lucide-react';

const Error = ({ cat }) => {
    return (
        <div className="error-container">
            <div className="error-icon-container">
                <Martini size={48} className="error-icon cocktail-icon" />
            </div>
            <h2 className="error-title">Aucun cocktail trouvé</h2>
            <p className="error-message">
                Désolé, nous n'avons pas encore de cocktails dans la catégorie
                <span className="category-highlight"> "{cat}"</span>
            </p>
            <div className="error-suggestion">
                <Search size={16} />
                <span>Essayez une autre catégorie ou revenez plus tard</span>
            </div>
        </div>
    );
};

export default Error;