import { useState, useEffect } from 'react';

const useCart = () => {
    const [cartItems, setCartItems] = useState([]);

    // Charger les articles depuis le localStorage au premier rendu
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
            // Si l'article n'existe pas, l'ajouter avec une quantité de 1
            updatedCart = [...cartItems, { ...item, quantity: 1 }];
        }

        // Mettre à jour à la fois l'état et le localStorage
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

    return { cartItems, addToCart, removeFromCart, clearCart };
};

export default useCart;