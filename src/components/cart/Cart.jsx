import React from 'react';
import './Cart.scss';
import { useCart } from '../../context/cartContext';
import {Link} from "react-router-dom";

const Cart = () => {
    const {
        cartItems,
        removeFromCart,
        isCartVisible,
        toggleCartVisibility,
        increaseQuantity,
        decreaseQuantity
    } = useCart();

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="cart-container">
            <button className="cart-button" onClick={toggleCartVisibility}>
                <i className="fa fa-cart-shopping"></i>
                {totalItems > 0 && (
                    <span className="cart-badge">{totalItems}</span>
                )}
            </button>

            <div
                className={`cart-overlay ${isCartVisible ? 'cart-overlay-visible' : ''}`}
                onClick={toggleCartVisibility}
            ></div>

            <div className={`cart-sidebar ${isCartVisible ? 'cart-visible' : 'cart-hidden'}`}>
                <div className="cart-header">
                    <h2>Votre panier</h2>
                    <button className="cart-close-button" onClick={toggleCartVisibility}>
                        <i className="fa fa-close"></i>
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <p>Votre panier est vide.</p>
                    </div>
                ) : (
                    <div className="cart-content">
                        <ul className="cart-items-list">
                            {cartItems.map((item) => (
                                <li key={item.id} className="cart-item">
                                    <div className="cart-item-info">
                                        <div className="cart-item-title">{item.title}</div>
                                        <div className="cart-item-price">{(item.price * item.quantity).toFixed(2)} €</div>
                                    </div>

                                    <div className="cart-item-actions">
                                        <div className="quantity-controls">
                                            <button
                                                className="quantity-btn decrease"
                                                onClick={() => decreaseQuantity(item.id)}
                                            >
                                                <i className="fa fa-minus"></i>
                                            </button>

                                            <span className="quantity">{item.quantity}</span>

                                            <button
                                                className="quantity-btn increase"
                                                onClick={() => increaseQuantity(item.id)}
                                            >
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>

                                        <button
                                            className="remove-button"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="cart-footer">
                            <div className="cart-total">
                                <span>Sous-total:</span>
                                <span className="total-amount">{totalPrice.toFixed(2)} €</span>
                            </div>

                            <div className="cart-buttons">
                                <Link to="/commande-preview" className="cart-button primary" onClick={toggleCartVisibility}>
                                    Commander
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;