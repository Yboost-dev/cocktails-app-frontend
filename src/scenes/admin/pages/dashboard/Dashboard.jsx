import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar/NavBar";
import Header from "../components/header/Header";
import "./Dashboard.scss";
import {
    BarChart3,
    DollarSign,
    ShoppingCart,
    Users,
    TrendingUp,
    Calendar,
    Clock,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Service temporaire avec données simulées
const mockDashboardService = {
    getRecentOrders: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, customer: "Jean Dupont", date: "2023-07-10T18:30:00", total: 45.50, status: "Livré" },
                    { id: 2, customer: "Marie Martin", date: "2023-07-10T17:15:00", total: 32.80, status: "En préparation" },
                    { id: 3, customer: "Lucas Bernard", date: "2023-07-10T16:45:00", total: 25.20, status: "En attente" },
                    { id: 4, customer: "Sophie Petit", date: "2023-07-09T19:20:00", total: 51.30, status: "Livré" },
                    { id: 5, customer: "Thomas Richard", date: "2023-07-09T15:10:00", total: 28.90, status: "Livré" }
                ]);
            }, 800);
        });
    },

    getTodayRevenue: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    today: 235.80,
                    yesterday: 198.50
                });
            }, 600);
        });
    },

    getWeeklyRevenue: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    total: 1458.90,
                    topProducts: [
                        {name: "Mojito", sales: 32, category: "Long Drink"},
                        {name: "Margarita", sales: 28, category: "Short Drink"},
                        {name: "Sex on the Beach", sales: 24, category: "Long Drink"},
                        {name: "Piña Colada", sales: 20, category: "Long Drink"},
                        {name: "Blue Lagoon", sales: 15, category: "Short Drink"}
                    ]
                });
            }, 700);
        });
    },

    getTotalCustomers: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    total: 124,
                    new: 8
                });
            }, 500);
        });
    }
};

const AdminDashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        recentOrders: [],
        todayRevenue: 0,
        yesterdayRevenue: 0,
        weeklyRevenue: 0,
        totalCustomers: 0,
        newCustomers: 0,
        topSellingProducts: []
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);

                // Récupérer les données du dashboard depuis notre service temporaire
                const recentOrders = await mockDashboardService.getRecentOrders();
                const todayRevenueData = await mockDashboardService.getTodayRevenue();
                const weeklyRevenueData = await mockDashboardService.getWeeklyRevenue();
                const customersData = await mockDashboardService.getTotalCustomers();

                // Mise à jour de l'état
                setDashboardData({
                    recentOrders: recentOrders.slice(0, 3), // Limiter aux 3 dernières commandes
                    todayRevenue: todayRevenueData.today,
                    yesterdayRevenue: todayRevenueData.yesterday,
                    weeklyRevenue: weeklyRevenueData.total,
                    totalCustomers: customersData.total,
                    newCustomers: customersData.new,
                    topSellingProducts: weeklyRevenueData.topProducts
                });

                setIsLoading(false);
            } catch (error) {
                console.error("Erreur lors du chargement des données du dashboard:", error);
                toast.error("Impossible de charger les données du dashboard");
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Calculer le pourcentage de changement du revenu par rapport à hier
    const calculateRevenueChange = () => {
        if (dashboardData.yesterdayRevenue === 0) return 100;
        const change = ((dashboardData.todayRevenue - dashboardData.yesterdayRevenue) / dashboardData.yesterdayRevenue) * 100;
        return Math.round(change);
    };

    const revenueChange = calculateRevenueChange();
    const isRevenueUp = revenueChange >= 0;

    // Formater la date
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    // Formater l'heure
    const formatTime = (dateString) => {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleTimeString('fr-FR', options);
    };

    // Formater le prix
    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
    };

    return (
        <div className="dashboard-global">
            <NavBar/>
            <div className="dashboard-content">
                <Header/>
                <div className="dashboard-content-body">
                    <div className="dashboard-header">
                        <h1>Tableau de Bord</h1>
                        <p className="date-display">
                            <Calendar size={16} />
                            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Chargement des données...</p>
                        </div>
                    ) : (
                        <>
                            {/* Cartes de statistiques */}
                            <div className="stats-cards-container">
                                <div className="stats-card revenue">
                                    <div className="stats-card-icon">
                                        <DollarSign size={24} />
                                    </div>
                                    <div className="stats-card-content">
                                        <h3>Chiffre d'affaires du jour</h3>
                                        <p className="stats-value">{formatPrice(dashboardData.todayRevenue)}</p>
                                        <div className={`stats-change ${isRevenueUp ? 'positive' : 'negative'}`}>
                                            {isRevenueUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                            <span>{Math.abs(revenueChange)}% par rapport à hier</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="stats-card orders">
                                    <div className="stats-card-icon">
                                        <ShoppingCart size={24} />
                                    </div>
                                    <div className="stats-card-content">
                                        <h3>Commandes hebdomadaires</h3>
                                        <p className="stats-value">{dashboardData.recentOrders.length}</p>
                                        <div className="stats-period">
                                            <Clock size={16} />
                                            <span>Cette semaine</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="stats-card customers">
                                    <div className="stats-card-icon">
                                        <Users size={24} />
                                    </div>
                                    <div className="stats-card-content">
                                        <h3>Clients totaux</h3>
                                        <p className="stats-value">{dashboardData.totalCustomers}</p>
                                        <div className="stats-change positive">
                                            <ArrowUpRight size={16} />
                                            <span>{dashboardData.newCustomers} nouveaux clients ce mois</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="stats-card weekly">
                                    <div className="stats-card-icon">
                                        <TrendingUp size={24} />
                                    </div>
                                    <div className="stats-card-content">
                                        <h3>CA hebdomadaire</h3>
                                        <p className="stats-value">{formatPrice(dashboardData.weeklyRevenue)}</p>
                                        <div className="stats-period">
                                            <Calendar size={16} />
                                            <span>7 derniers jours</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-sections">
                                {/* Section des commandes récentes */}
                                <div className="dashboard-section recent-orders">
                                    <div className="section-header">
                                        <h2>Commandes Récentes</h2>
                                        <a href="/admin/orders" className="view-all">Voir toutes les commandes</a>
                                    </div>
                                    <div className="orders-container">
                                        {dashboardData.recentOrders.map(order => (
                                            <div className="order-card" key={order.id}>
                                                <div className="order-header">
                                                    <span className="order-id">Commande #{order.id}</span>
                                                    <span className={`order-status ${order.status.toLowerCase().replace(' ', '-')}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div className="order-details">
                                                    <p className="order-customer">{order.customer}</p>
                                                    <div className="order-meta">
                                                        <div className="order-date">
                                                            <Calendar size={14} />
                                                            <span>{formatDate(order.date)}</span>
                                                        </div>
                                                        <div className="order-time">
                                                            <Clock size={14} />
                                                            <span>{formatTime(order.date)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="order-price">
                                                    <span>{formatPrice(order.total)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Section des produits les plus vendus */}
                                <div className="dashboard-section top-products">
                                    <div className="section-header">
                                        <h2>Cocktails Populaires</h2>
                                        <a href="/admin/articles" className="view-all">Voir tous les cocktails</a>
                                    </div>
                                    <div className="top-products-chart">
                                        {dashboardData.topSellingProducts.map((product, index) => (
                                            <div className="product-item" key={index}>
                                                <div className="product-info">
                                                    <span className="product-name">{product.name}</span>
                                                    <span className="product-category">{product.category}</span>
                                                </div>
                                                <div className="product-sales-container">
                                                    <div
                                                        className="product-sales-bar"
                                                        style={{width: `${(product.sales / 40) * 100}%`}} // Ajuster pour max 40 ventes
                                                    ></div>
                                                    <span className="product-sales-value">{product.sales} vendus</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default AdminDashboard;