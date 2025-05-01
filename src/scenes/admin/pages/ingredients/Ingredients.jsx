import React from "react";
import NavBar from "../components/navBar/NavBar";
import IngredientsTable from "./components/tableau/Tableau";
import Header from "../components/header/Header";
import './Ingredients.scss';

const AdminIngredients = () => {
    return (
        <div className="dashboard-global">
            <NavBar/>
            <div className="dashboard-content">
                <Header/>
                <div className="dashboard-content-body">
                    <div>
                        <IngredientsTable/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminIngredients;