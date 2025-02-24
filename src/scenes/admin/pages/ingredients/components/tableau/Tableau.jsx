import React, {useEffect, useState} from 'react';
import {getAllIngredients} from "services/ingredients/ingredientsService";
import {Link} from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa";
import FormCreateUser from "../../../accounts/components/tableau/components/formCreateUser/formCreateUser";
import FormCreateIngredient from "./components/formCreateIngredient/formCreateIngredient";
import {toast} from "react-toastify";
import {createIngredient} from "../../../../../../services/ingredients/ingredientsService";

const Tableau = () => {
    const [ingredients, setIngredients] = useState([]);
    const [showDeletePopup, setShowDeletePopup] = useState(false); // Gestion de la pop-up de suppression
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false); // État de chargement

    useEffect(() => {
        getAllIngredients()
            .then((data) => {
                setIngredients(data);
            })
            .catch((error) => {
                console.error("Une erreur est survenue :", error);
            });
    }, []);

    const handleSave = async (ingredient) => {
        try {
            setLoading(true); // Active l'état de chargement

            // Appelle la fonction `register` pour créer l'utilisateur
            const newUser = await createIngredient(ingredient);

            // Met à jour l'état local des utilisateurs pour afficher le nouvel utilisateur
            setIngredients((prevIngredients) => [...prevIngredients, newUser]);

            // Afficher un toast de succès
            toast.success("Utilisateur créé avec succès !");
        } catch (error) {
            // Afficher un toast d'erreur
            toast.error(`Erreur : ${error.message}`);
        } finally {
            setLoading(false); // Désactive l'état de chargement
        }
    };

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
                <button onClick={() => setShowModal(true)} className="btn-admin">
                    Ajouter un ingrédient
                </button>
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
            {showModal && (
                <div className="modal">
                    <FormCreateIngredient
                        onClose={() => setShowModal(false)} // Ferme la pop-up
                        onSave={handleSave} // Fonction pour gérer la sauvegarde
                    />
                </div>
            )}
        </div>
    );
};

export default Tableau;