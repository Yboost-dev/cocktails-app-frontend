import React, {useEffect, useState} from 'react';
import {getAllIngredients} from "services/ingredients/ingredientsService";
import {Link} from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa";

const Tableau = () => {
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

    const handleEdit = (id) => {
        console.log(`Modifier l'utilisateur : ${id}`);
        // Ajoutez la logique de l'édition ici
    };

    const handleDelete = (id) => {
        console.log(`Supprimer l'utilisateur : ${id}`);
        // Ajoutez la logique de la suppression ici
    };

    return (
        <div className="tableau">
            <div className="tableau-header">
                <h3>Tableau des ingrédients</h3>
                <Link to="/admin/ingredient/add" className="btn-admin-link">
                    Ajouter un ingrédients
                </Link>
            </div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom Produit</th>
                    <th>Quantité</th>
                    <th>Unité</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {ingredients.map((ingredient) => (
                    <tr key={ingredient.id}>
                        <td>{ingredient.id}</td>
                        <td>{ingredient.name}</td>
                        <td>{ingredient.quantity}</td>
                        <td>{ingredient.unit}</td>
                        <td>
                            <button onClick={() => handleEdit(ingredient.id)} className="edit-btn"><FaEdit/></button>
                            <button onClick={() => handleDelete(ingredient.id)} className="delete-btn"><FaTrash/></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tableau;