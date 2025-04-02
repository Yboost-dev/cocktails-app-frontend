import React, {useState} from 'react';
import './Cart.scss';
import { useCart } from '../../context/cartContext'; // Importer le hook du contexte

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useCart(); // Récupérer l'état et les fonctions via le hook

    const [isCartVisible, setIsCartVisible] = useState(false); // Gestion de la visibilité du panier
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0); // Calcul du total des articles

    // Fonction pour toggle (montrer/masquer) le panier
    const toggleCartVisibility = () => {
        setIsCartVisible((prevState) => !prevState);
    };

    return (
        <div>
            <button className="cart-button" onClick={toggleCartVisibility}>
                <i className="fa fa-cart-shopping"></i> ({totalItems})
            </button>

            {/* Overlay (arrière-plan semi-transparent) */}
            <div
                className={`cart-overlay ${isCartVisible ? 'cart-overlay-visible' : ''}`}
                onClick={toggleCartVisibility} // Cliquer sur l'overlay pour fermer le panier
            ></div>

            <div className={
                `${isCartVisible ? 'cart-visible' : 'cart-hidden'}`
            }>
                {/* Bouton pour fermer le panier */}
                <button className="cart-close-button" onClick={toggleCartVisibility}>
                    &times;
                </button>
                {cartItems.length === 0 ? (
                    <p>Votre panier est vide.</p>
                ) : (
                    <>
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
                        <button className="clear-button" onClick={clearCart}>
                            Vider le panier
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;