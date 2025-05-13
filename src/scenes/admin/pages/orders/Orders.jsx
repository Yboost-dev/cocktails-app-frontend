import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar/NavBar";
import Header from "../components/header/Header";
import { getAllOrders, updateOrderStatus, updatePaymentStatus } from "../../../../services/orders/ordersService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, CheckCircle, XCircle, Clock, CreditCard, DollarSign, AlertCircle, X } from 'lucide-react';
import './Orders.scss';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await getAllOrders();
            setOrders(data);
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les commandes");
            setLoading(false);
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);

            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );

            toast.success(`Commande #${orderId} mise à jour avec succès`);
        } catch (error) {
            toast.error("Échec de la mise à jour du statut");
        }
    };

    const handleUpdatePaymentStatus = async (orderId, isPaid) => {
        try {
            await updatePaymentStatus(orderId, isPaid);

            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, paid: isPaid } : order
                )
            );

            toast.success(`Statut de paiement de la commande #${orderId} mis à jour`);
        } catch (error) {
            toast.error("Échec de la mise à jour du statut de paiement");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'status-pending';
            case 'finish':
                return 'status-finished';
            case 'canceled':
                return 'status-canceled';
            default:
                return '';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <Clock size={18} />;
            case 'finish':
                return <CheckCircle size={18} />;
            case 'canceled':
                return <XCircle size={18} />;
            default:
                return null;
        }
    };

    const getPaymentIcon = (status, paid) => {
        if (status === 'canceled') {
            return <AlertCircle size={16} className="payment-icon canceled" />;
        }

        if (status === 'finish') {
            return paid
                ? <CreditCard size={16} className="payment-icon paid" />
                : <DollarSign size={16} className="payment-icon unpaid" />;
        }

        return null;
    };

    const translateStatus = (status) => {
        switch (status) {
            case 'pending':
                return 'En attente';
            case 'finish':
                return 'Terminée';
            case 'canceled':
                return 'Annulée';
            default:
                return status;
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const openOrderDetails = (order) => {
        setSelectedOrder(order);
        setModalOpen(true);
    };

    const closeOrderDetails = () => {
        setModalOpen(false);
        setSelectedOrder(null);
    };

    const filteredOrders = orders.filter(order => {
        if (filter !== 'all' && order.status !== filter) {
            return false;
        }

        if (searchTerm && !order.email.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }

        return true;
    });

    return (
        <div className="dashboard-global">
            <NavBar/>
            <div className="dashboard-content">
                <Header/>
                <div className="dashboard-content-body">
                    <div className="orders-dashboard">
                        <div className="orders-header">
                            <h1>Gestion des Commandes</h1>
                            <div className="orders-controls">
                                <div className="search-container">
                                    <input
                                        type="text"
                                        placeholder="Rechercher par email..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="search-input"
                                    />
                                </div>
                                <div className="filter-container">
                                    <select
                                        value={filter}
                                        onChange={handleFilterChange}
                                        className="filter-select"
                                    >
                                        <option value="all">Toutes les commandes</option>
                                        <option value="pending">En attente</option>
                                        <option value="finish">Terminées</option>
                                        <option value="canceled">Annulées</option>
                                    </select>
                                </div>
                                <button
                                    className="refresh-button"
                                    onClick={fetchOrders}
                                >
                                    Actualiser
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="loading-container">
                                <div className="spinner"></div>
                                <p>Chargement des commandes...</p>
                            </div>
                        ) : (
                            <>
                                {filteredOrders.length === 0 ? (
                                    <div className="no-orders">
                                        <p>Aucune commande ne correspond à vos critères.</p>
                                    </div>
                                ) : (
                                    <div className="orders-table-container">
                                        <table className="orders-table">
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Email</th>
                                                <th>Table</th>
                                                <th>Articles</th>
                                                <th>Total</th>
                                                <th>Statut</th>
                                                <th>Paiement</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {filteredOrders.map((order) => (
                                                <tr key={order.id} className={order.status === 'finish' ? (order.paid ? 'row-paid' : 'row-unpaid') : ''}>
                                                    <td>
                                                        <div className="order-id">
                                                            {getPaymentIcon(order.status, order.paid)}
                                                            <span>#{order.id}</span>
                                                        </div>
                                                    </td>
                                                    <td>{order.email}</td>
                                                    <td>N°{order.table || 'N/A'}</td>
                                                    <td>{order.articles.length} articles</td>
                                                    <td>
                                                        {order.articles.reduce((total, item) =>
                                                            total + (item.quantity * item.articlePrice), 0).toFixed(2)} €
                                                    </td>
                                                    <td>
                                                        <div className={`status-badge ${getStatusColor(order.status)}`}>
                                                            {getStatusIcon(order.status)}
                                                            <span>{translateStatus(order.status)}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div
                                                            className={`payment-badge ${order.paid ? 'paid' : 'unpaid'}`}
                                                            onClick={() => handleUpdatePaymentStatus(order.id, !order.paid)}
                                                            title={order.paid ? "Marquer comme non payé" : "Marquer comme payé"}
                                                        >
                                                            {order.paid ? 'Payé' : 'Non payé'}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            <button
                                                                className="view-button"
                                                                title="Voir les détails"
                                                                onClick={() => openOrderDetails(order)}
                                                            >
                                                                <Eye size={18} />
                                                            </button>
                                                            {order.status === 'pending' && (
                                                                <>
                                                                    <button
                                                                        className="complete-button"
                                                                        title="Marquer comme terminée"
                                                                        onClick={() => handleUpdateOrderStatus(order.id, 'finish')}
                                                                    >
                                                                        <CheckCircle size={18} />
                                                                    </button>
                                                                    <button
                                                                        className="cancel-button"
                                                                        title="Annuler la commande"
                                                                        onClick={() => handleUpdateOrderStatus(order.id, 'canceled')}
                                                                    >
                                                                        <XCircle size={18} />
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {modalOpen && selectedOrder && (
                <div className="order-modal-overlay" onClick={closeOrderDetails}>
                    <div className="order-modal" onClick={e => e.stopPropagation()}>
                        <div className="order-modal-header">
                            <h2>Détails de la commande #{selectedOrder.id}</h2>
                            <button className="close-button" onClick={closeOrderDetails}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="order-modal-content">
                            <div className="order-details-section">
                                <h3>Informations client</h3>
                                <div className="details-grid">
                                    <div className="details-row">
                                        <span className="details-label">Email:</span>
                                        <span className="details-value">{selectedOrder.email}</span>
                                    </div>
                                    <div className="details-row">
                                        <span className="details-label">Téléphone:</span>
                                        <span className="details-value">{selectedOrder.phone || 'Non renseigné'}</span>
                                    </div>
                                    <div className="details-row">
                                        <span className="details-label">Table:</span>
                                        <span className="details-value">N°{selectedOrder.table || 'Non renseigné'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="order-details-section">
                                <h3>Statut de la commande</h3>
                                <div className="status-details">
                                    <div className="details-row">
                                        <span className="details-label">État:</span>
                                        <div className={`status-badge ${getStatusColor(selectedOrder.status)}`}>
                                            {getStatusIcon(selectedOrder.status)}
                                            <span>{translateStatus(selectedOrder.status)}</span>
                                        </div>
                                    </div>
                                    <div className="details-row">
                                        <span className="details-label">Paiement:</span>
                                        <div
                                            className={`payment-badge ${selectedOrder.paid ? 'paid' : 'unpaid'}`}
                                            onClick={() => handleUpdatePaymentStatus(selectedOrder.id, !selectedOrder.paid)}
                                        >
                                            {selectedOrder.paid ? 'Payé' : 'Non payé'}
                                        </div>
                                    </div>
                                </div>

                                {selectedOrder.status === 'pending' && (
                                    <div className="status-actions">
                                        <button
                                            className="status-action-button complete"
                                            onClick={() => {
                                                handleUpdateOrderStatus(selectedOrder.id, 'finish');
                                                closeOrderDetails();
                                            }}
                                        >
                                            <CheckCircle size={18} />
                                            <span>Marquer comme terminée</span>
                                        </button>
                                        <button
                                            className="status-action-button cancel"
                                            onClick={() => {
                                                handleUpdateOrderStatus(selectedOrder.id, 'canceled');
                                                closeOrderDetails();
                                            }}
                                        >
                                            <XCircle size={18} />
                                            <span>Annuler la commande</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="order-details-section">
                                <h3>Articles commandés</h3>
                                <table className="order-items-table">
                                    <thead>
                                    <tr>
                                        <th>Article</th>
                                        <th>Quantité</th>
                                        <th>Prix unitaire</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {selectedOrder.articles.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.articleId}</td>
                                            <td>{item.quantity}</td>
                                            <td>{parseFloat(item.articlePrice).toFixed(2)} €</td>
                                            <td>{(item.quantity * parseFloat(item.articlePrice)).toFixed(2)} €</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                                <div className="order-total">
                                    <div className="total-row">
                                        <span>Total:</span>
                                        <span>{selectedOrder.articles.reduce((total, item) =>
                                            total + (item.quantity * parseFloat(item.articlePrice)), 0).toFixed(2)} €</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default AdminOrders;