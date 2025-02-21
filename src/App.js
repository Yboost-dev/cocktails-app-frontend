import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoute from "routes/privateRoute/PrivateRoute";
import '@fortawesome/fontawesome-free/css/all.min.css';

import Home from "scenes/home/Home";
import Login from "scenes/admin/auth/login/Login";
import Dashboard from "scenes/admin/pages/dashboard/Dashboard";
import Orders from "scenes/admin/pages/orders/Orders";
import Accounts from "scenes/admin/pages/accounts/Accounts";
import Articles from "scenes/admin/pages/articles/Articles";
import Category from "scenes/admin/pages/category/Category";
import Ingredients from "scenes/admin/pages/ingredients/Ingredients";
import NotFound from "scenes/notFound/NotFound";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Routes public */}
                <Route path="/" element={<Home/>}/>

                {/* Routes authentication */}
                <Route path="/admin/auth/login" element={<Login/>}/>

                {/* Routes catégories */}
                <Route path="/cocktails" element={<Home/>}/>
                <Route path="/mocktails" element={<Home/>}/>
                <Route path="/indemodables" element={<Home/>}/>
                <Route path="/spiritueux" element={<Home/>}/>
                <Route path="/softs" element={<Home/>}/>
                <Route path="/shooters" element={<Home/>}/>
                <Route path="/long-drink" element={<Home/>}/>
                <Route path="/short-drink" element={<Home/>}/>

                {/* Routes private */}
                <Route element={<PrivateRoute/>}>
                    <Route path="/admin/dashboard" element={<Dashboard/>}/>
                    <Route path="/admin/orders" element={<Orders/>}/>
                    <Route path="/admin/accounts" element={<Accounts/>}/>
                    <Route path="/admin/articles" element={<Articles/>}/>
                    <Route path="/admin/category" element={<Category/>}/>
                    <Route path="/admin/ingredients" element={<Ingredients/>}/>
                </Route>

                {/* Route not found */}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
};

export default App;