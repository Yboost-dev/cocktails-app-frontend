import React from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';

const Card = ({ id, title, description, price, imagePath, ingredients }) => {
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
                        {price !== undefined && (
                            <span className="card-price">{price.toFixed(2)} €</span>
                        )}
                    </div>
                </div>
            </Link>
            <button className="card-button">
                Ajouter au panier
            </button>
        </li>
    );
};

export default Card;