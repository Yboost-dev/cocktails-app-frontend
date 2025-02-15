import React from "react";
import NavBar from "../components/navBar/NavBar";
import Header from "../components/header/Header";
import Tableau from "./components/tableau/Tableau";

const Category = () => {
    return (
        <div className="dashboard-global">
            <NavBar/>
            <div className="dashboard-content">
                <Header/>
                <div className="dashboard-content-body">
                    <p>Catégories</p>
                    <Tableau/>
                </div>
            </div>
        </div>
    );
};

export default Category;