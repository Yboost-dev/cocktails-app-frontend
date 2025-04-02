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
                        {price !== undefined && (
                            <div className="card-price">{price.toFixed(2)} €</div>
                        )}
                    </div>
                    <div className="card-content">
                        <h2 className="card-title">{title}</h2>
                        <p className="card-description">{description}</p>

                        <div className="card-footer">
                            <span className="view-more">Ajouter au panier</span>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default Card;