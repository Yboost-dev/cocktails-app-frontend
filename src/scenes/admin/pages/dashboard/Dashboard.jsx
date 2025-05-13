import React, {useState, useEffect} from "react";
import NavBar from "../components/navBar/NavBar";
import Header from "../components/header/Header";
import "./Dashboard.scss";
import {
    DollarSign,
    ShoppingCart,
    Users,
    TrendingUp,
    Calendar,
    Clock,
} from 'lucide-react';
import {toast, ToastContainer} from "react-toastify";
import {
    getDailyRevenue,
    getOrdersWeekly,
    getRecentOrders,
    getWeeklyRevenue
} from "../../../../services/orders/ordersService";
import "react-toastify/dist/ReactToastify.css";

const mockDashboardService = {
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
        weeklyOrdersCount: 0,
        weeklyRevenue: 0,
        totalCustomers: 0,
        newCustomers: 0,
        topSellingProducts: []
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);

                let recentOrders = [];
                let todayRevenueData = 0;
                let weeklyRevenueData = 0;
                let mockWeeklyData = {topProducts: []};
                let customersData = {total: 0, new: 0};
                let weeklyOrdersCount = 0;

                try {
                    recentOrders = await getRecentOrders(3) || [];
                } catch (error) {
                    toast.error("Erreur lors de la récupération des commandes récentes")
                    recentOrders = [];
                }

                try {
                    todayRevenueData = await getDailyRevenue() || 0;
                } catch (error) {
                    toast.error("Erreur lors de la récupération du chiffre d'affaires journalier");
                    todayRevenueData = 0;
                }

                try {
                    weeklyRevenueData = await getWeeklyRevenue() || 0;
                } catch (error) {
                    toast.error("Erreur lors de la récupération du chiffre d'affaires hebdomadaire")
                    weeklyRevenueData = 0;
                }

                try {
                    mockWeeklyData = await mockDashboardService.getWeeklyRevenue();
                } catch (error) {
                    toast.error("Erreur lors de la récupération des produits populaires")
                    mockWeeklyData = {topProducts: []};
                }

                try {
                    customersData = await mockDashboardService.getTotalCustomers();
                } catch (error) {
                    toast.error("Erreur lors de la récupération des données clients")
                    customersData = {total: 0, new: 0};
                }
                try {
                    weeklyOrdersCount = await getOrdersWeekly();
                } catch (error) {
                    toast.error("Erreur lors de la récupération du nombre de commandes hebdomadaires")
                    weeklyOrdersCount = 0;
                }


                setDashboardData({
                    recentOrders: recentOrders,
                    weeklyOrdersCount: weeklyOrdersCount,
                    todayRevenue: todayRevenueData,
                    yesterdayRevenue: 0,
                    weeklyRevenue: weeklyRevenueData,
                    totalCustomers: weeklyOrdersCount,
                    newCustomers: customersData.new,
                    topSellingProducts: mockWeeklyData.topProducts || []
                });

                setIsLoading(false);
            } catch (error) {
                toast.error("Impossible de charger les données du dashboard");

                setDashboardData({
                    recentOrders: [],
                    todayRevenue: 0,
                    weeklyOrdersCount: 0,
                    yesterdayRevenue: 0,
                    weeklyRevenue: 0,
                    totalCustomers: 0,
                    newCustomers: 0,
                    topSellingProducts: []
                });

                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(price);
    };

    const formatDate = (dateString) => {
        const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
        return new Date(dateString).toLocaleDateString('fr-FR', options);
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
                            <Calendar size={16}/>
                            {new Date().toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Chargement des données...</p>
                        </div>
                    ) : (
                        <>
                            <div className="stats-cards-container">
                                <div className="stats-card revenue">
                                    <div className="stats-card-icon">
                                        <DollarSign size={24}/>
                                    </div>
                                    <div className="stats-card-content">
                                        <h3>Chiffre d'affaires du jour</h3>
                                        <p className="stats-value">{formatPrice(dashboardData.todayRevenue)}</p>
                                    </div>
                                </div>

                                <div className="stats-card orders">
                                    <div className="stats-card-icon">
                                        <ShoppingCart size={24}/>
                                    </div>
                                    <div className="stats-card-content">
                                        <h3>Commandes hebdomadaires</h3>
                                        <p className="stats-value">{dashboardData.weeklyOrdersCount}</p>
                                        <div className="stats-period">
                                            <Clock size={16}/>
                                            <span>7 derniers jours</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="stats-card customers">
                                    <div className="stats-card-icon">
                                        <Users size={24}/>
                                    </div>
                                    <div className="stats-card-content">
                                        <h3>Clients totaux</h3>
                                        <p className="stats-value">{dashboardData.recentOrders.length}</p>
                                    </div>
                                </div>

                                <div className="stats-card weekly">
                                    <div className="stats-card-icon">
                                        <TrendingUp size={24}/>
                                    </div>
                                    <div className="stats-card-content">
                                        <h3>CA hebdomadaire</h3>
                                        <p className="stats-value">{formatPrice(dashboardData.weeklyRevenue)}</p>
                                        <div className="stats-period">
                                            <Calendar size={16}/>
                                            <span>7 derniers jours</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-sections">
                                <div className="dashboard-section">
                                    <div className="section-header">
                                        <h2>Commandes Récentes</h2>
                                        <a href="/admin/orders" className="view-all">Voir toutes les commandes</a>
                                    </div>
                                    <div className="orders-container">
                                        {dashboardData.recentOrders.map(order => (
                                            <div className="order-card" key={order.id}>
                                                <div className="order-header">
                                                    <span className="order-id">Commande #{order.id}</span>
                                                    <span
                                                        className={`order-status ${order.status.toLowerCase().replace(' ', '-')}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div className="order-details">
                                                    <p className="order-customer">{order.email}</p>
                                                    <div className="order-meta">
                                                        <div className="order-date">
                                                            <span>Table N° {order.table}</span>
                                                        </div>
                                                        <div className="order-date">
                                                            <Calendar size={14}/>
                                                            <span>{formatDate(order.createdAt)}</span>
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