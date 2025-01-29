import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import { getAllOrders } from "services/orders/ordersService";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getAllOrders()
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.error("Une erreur est survenue :", error);
            });
    }, []);

    return (
        <div className="dashboard-global">
            <NavBar />
            <p>Commandes</p>
            {orders.map((order) => {
                const totalPrice = order.articles.reduce(
                    (acc, product) => acc + product.articlePrice * product.quantity,
                    0
                );
                return (
                    <div key={order.id}>
                        <p>ID: {order.id}</p>
                        <p>Email: {order.email}</p>
                        <p>Status: {order.status}</p>
                        <p>Prix total: {totalPrice}</p>
                        {order.articles.map((product) => (
                            <p key={product.articleId}>
                                Article: {product.articleId} - Prix: {product.articlePrice} - Quantité: {product.quantity}
                            </p>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default Orders;