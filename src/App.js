import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoute from "routes/privateRoute/PrivateRoute";
import '@fortawesome/fontawesome-free/css/all.min.css';

import Home from "scenes/home/Home";
import Login from "scenes/admin/auth/login/Login";
import Register from "scenes/admin/auth/register/Register";
import Dashboard from "scenes/admin/pages/dashboard/Dashboard";
import NotFound from "scenes/notFound/NotFound";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Routes public */}
                <Route path="/" element={<Home/>}/>

                {/* Routes authentication */}
                <Route path="/admin/auth/login" element={<Login/>}/>
                <Route path="/admin/auth/register" element={<Register/>}/>

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
                </Route>

                {/* Route not found */}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
};

export default App;