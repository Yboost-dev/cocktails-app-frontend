import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PublicRoute from "routes/publicRoute/PublicRoute";
import PrivateRoute from "routes/privateRoute/PrivateRoute";
import '@fortawesome/fontawesome-free/css/all.min.css';

import Home from "scenes/home/Home";
import Login from "scenes/login/Login";
import Dashboard from "scenes/dashboard/Dashboard";
import NotFound from "scenes/notFound/NotFound";

const App = () => {
    const [isAuthenticated] = useState(false);
    return (
        <Router>
            <Routes>
                {/* Routes publiques */}
                <Route element={<PublicRoute isAuthenticated={isAuthenticated}/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>

                    {/* Routes catégories */}
                    <Route path="/cocktails" element={<Home/>}/>
                    <Route path="/mocktails" element={<Home/>}/>
                    <Route path="/indemodables" element={<Home/>}/>
                    <Route path="/spiritueux" element={<Home/>}/>
                    <Route path="/softs" element={<Home/>}/>
                    <Route path="/shooters" element={<Home/>}/>
                    <Route path="/long-drink" element={<Home/>}/>
                    <Route path="/short-drink" element={<Home/>}/>
                </Route>

                {/* Routes privées */}
                <Route element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                    <Route path="/admin/dashboard" element={<Dashboard/>}/>
                </Route>

                {/* Route pour toute page inexistante */}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
};

export default App;