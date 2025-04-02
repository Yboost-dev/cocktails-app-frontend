import React from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';
import { useCart } from '../../../../context/cartContext'; // Importer le hook du contexte

const Card = ({ id, title, price, imagePath }) => {
    const { addToCart } = useCart(); // Accéder à addToCart depuis le contexte

    const handleAddToCart = () => {
        const item = { id, title, price }; // Structure de l'article
        addToCart(item);
    };

    return (
        <li className="card-item">
            <Link to={`/article/${id}`} className="card-link">
                <div className="card">
                    <div className="card-image-container">
                        <img
                            src={`/images/${imagePath}`}
                            alt={title}
                            className="card-image"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/img/placeholder.png';
                            }}
                        />
                    </div>
                    <div className="card-content">
                        <span className="card-title">{title}</span>
                        <span className="card-price">{price.toFixed(2)} €</span>
                    </div>
                </div>
            </Link>
            <button className="card-button" onClick={handleAddToCart}>
                Ajouter au panier
            </button>
        </li>
    );
};

export default Card;