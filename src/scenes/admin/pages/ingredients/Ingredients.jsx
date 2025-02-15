import React from "react";
import NavBar from "../components/navBar/NavBar";
import Tableau from "./components/tableau/Tableau";
import Header from "../components/header/Header";

const Ingredients = () => {
    return (
        <div className="dashboard-global">
            <NavBar/>
            <div className="dashboard-content">
                <Header/>
                <div className="dashboard-content-body">
                    <p>Ingrédients</p>
                    <Tableau/>
                </div>
            </div>
        </div>
    );
};

export default Ingredients;