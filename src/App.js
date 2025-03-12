import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoute from "routes/privateRoute/PrivateRoute";
import '@fortawesome/fontawesome-free/css/all.min.css';

import Home from "scenes/home/Home";
import Login from "scenes/admin/auth/login/Login";
import Category from "scenes/category/Category";
import NotFound from "scenes/notFound/NotFound";
import Articles from "scenes/article/Article";

import AdminDashboard from "scenes/admin/pages/dashboard/Dashboard";
import AdminOrders from "scenes/admin/pages/orders/Orders";
import AdminAccounts from "scenes/admin/pages/accounts/Accounts";
import AdminArticles from "scenes/admin/pages/articles/Articles";
import AdminIngredients from "scenes/admin/pages/ingredients/Ingredients";
import AdminCategory from "scenes/admin/pages/category/Category";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Routes public */}
                <Route path="/" element={<Home/>}/>

                {/* Routes authentication */}
                <Route path="/admin/auth/login" element={<Login/>}/>

                {/* Routes catégories */}
                <Route path=":category" element={<Category/>}/>
                <Route path="/article/:id" element={<Articles/>}/>

                {/* Routes private */}
                <Route element={<PrivateRoute/>}>
                    <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                    <Route path="/admin/orders" element={<AdminOrders/>}/>
                    <Route path="/admin/accounts" element={<AdminAccounts/>}/>
                    <Route path="/admin/articles" element={<AdminArticles/>}/>
                    <Route path="/admin/category" element={<AdminCategory/>}/>
                    <Route path="/admin/ingredients" element={<AdminIngredients/>}/>
                </Route>

                {/* Route not found */}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
};

export default App;