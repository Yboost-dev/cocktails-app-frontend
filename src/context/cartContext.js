import React, {createContext, useState, useContext, useEffect} from 'react';

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCartItems);
    }, []);

    const toggleCartVisibility = () => {
        setIsCartVisible((prevState) => !prevState);
    };

    const addToCart = (item) => {
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
        let updatedCart;

        if (existingItem) {
            updatedCart = cartItems.map((cartItem) =>
                cartItem.id === item.id
                    ? {...cartItem, quantity: cartItem.quantity + 1}
                    : cartItem
            );
        } else {
            updatedCart = [...cartItems, {...item, quantity: 1}];
        }

        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const increaseQuantity = (itemId) => {
        const updatedCart = cartItems.map((item) =>
            item.id === itemId
                ? {...item, quantity: item.quantity + 1}
                : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const decreaseQuantity = (itemId) => {
        const existingItem = cartItems.find((item) => item.id === itemId);

        if (existingItem.quantity === 1) {
            removeFromCart(itemId);
            return;
        }

        const updatedCart = cartItems.map((item) =>
            item.id === itemId
                ? {...item, quantity: item.quantity - 1}
                : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeFromCart = (itemId) => {
        const updatedCart = cartItems.filter((cartItem) => cartItem.id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                isCartVisible,
                toggleCartVisibility,
                increaseQuantity,
                decreaseQuantity
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};