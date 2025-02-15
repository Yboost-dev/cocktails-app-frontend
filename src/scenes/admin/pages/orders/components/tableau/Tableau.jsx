import React, {useEffect, useState} from 'react';
import {FaEdit, FaTrash} from "react-icons/fa";
import {getAllOrders} from "services/orders/ordersService";

const Tableau = () => {

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
        <div className="tableau">
            <div className="tableau-header">
                <h3>Tableau des commandes</h3>
            </div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email client</th>
                    <th>Status</th>
                    <th>Prix total</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => {
                    const totalPrice = order.articles.reduce(
                        (acc, product) => acc + product.articlePrice * product.quantity,
                        0
                    );
                    return (
                        <tr key={order.id}>
                            <th>{order.id}</th>
                            <th>{order.email}</th>
                            <th>{order.status}</th>
                            <th>{totalPrice}</th>
                            <th>
                                <button className="edit-btn"><FaEdit /></button>
                                <button className="delete-btn"><FaTrash /></button>
                            </th>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default Tableau;