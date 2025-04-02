import React from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';
import { useCart } from '../../../../context/cartContext';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const Card = ({ id, title, price, imagePath }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const item = { id, title, price };
        addToCart(item);
    };

    return (
        <li className="card-item">
            <Link to={`/article/${id}`} className="card-link">
                <div className="card">
                    <div className="card-image-container">
                        <img
                            src={`${API_BASE_URL}${imagePath}`}
                            alt={title}
                            className="card-image"
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