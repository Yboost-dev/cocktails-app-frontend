import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import { getAllIngredients } from "services/ingredients/ingredientsService";
import Tableau from "./components/tableau/Tableau";
import Header from "../components/header/Header";

const Ingredients = () => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getAllIngredients()
            .then((data) => {
                setIngredients(data);
            })
            .catch((error) => {
                console.error("Une erreur est survenue :", error);
            });
    }, []);

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