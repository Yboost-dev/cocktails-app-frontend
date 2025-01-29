import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import { getAllIngredients } from "services/ingredients/ingredientsService";

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
            <p>Ingrédients</p>
            {ingredients.map((ingredient) => (
                <div key={ingredient.id}>
                    <p>{ingredient.name}</p>
                    <p>{ingredient.quantity}</p>
                    <p>{ingredient.unit}</p>
                </div>
            ))}
        </div>
    );
};

export default Ingredients;