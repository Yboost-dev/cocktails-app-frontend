import React, { createContext, useState, useContext, useEffect } from 'react';

// Création du contexte du panier
const CartContext = createContext();

// Fournisseur du contexte
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Charger les articles depuis le localStorage quand l'application démarre
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCartItems);
    }, []);

    // Ajouter un article au panier
    const addToCart = (item) => {
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
        let updatedCart;

        if (existingItem) {
            // Si l'article existe, incrémenter sa quantité
            updatedCart = cartItems.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );
        } else {
            // Sinon, ajouter l'article avec une quantité initiale de 1
            updatedCart = [...cartItems, { ...item, quantity: 1 }];
        }

        // Mettre à jour l'état et persister dans le localStorage
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Supprimer un article du panier
    const removeFromCart = (itemId) => {
        const updatedCart = cartItems.filter((cartItem) => cartItem.id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Nettoyer le panier
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useCart = () => {
    return useContext(CartContext);
};