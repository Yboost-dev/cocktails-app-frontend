import React, {useState} from 'react';
import './Cart.scss';
import { useCart } from '../../context/cartContext'; // Importer le hook du contexte

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();

    const [isCartVisible, setIsCartVisible] = useState(false);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const toggleCartVisibility = () => {
        setIsCartVisible((prevState) => !prevState);
    };

    return (
        <div>
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

            <div className={
                `${isCartVisible ? 'cart-visible' : 'cart-hidden'}`
            }>
                <button className="cart-close-button" onClick={toggleCartVisibility}>
                    <i className="fa fa-close"></i>
                </button>
                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <p>Votre panier est vide.</p>
                    </div>
                ) : (
                    <div className="cart-items">
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.id}>
                                    {item.title} - {item.quantity} x {item.price.toFixed(2)} €
                                    <button
                                        className="remove-button"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Supprimer
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-footer">
                            <div>
                                sous total
                            </div>
                            <div>
                                <button>
                                    voir le panier
                                </button>
                                <button>
                                    Commander
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;