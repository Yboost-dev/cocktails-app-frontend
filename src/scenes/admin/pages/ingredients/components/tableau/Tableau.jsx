import React, {useEffect, useState} from 'react';
import {getAllIngredients, deleteIngredient} from "services/ingredients/ingredientsService";
import FormCreateIngredient from "./components/formCreateIngredient/formCreateIngredient";
import {toast, ToastContainer} from "react-toastify";
import {createIngredient} from "../../../../../../services/ingredients/ingredientsService";
import { X, Pencil } from 'lucide-react';
import PopupDelete from "./components/popupDelete/popupDelete";

const Tableau = () => {
    const [ingredients, setIngredients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false); // Gestion de la pop-up de suppression
    const [loading, setLoading] = useState(false); // État de chargement
    const [ingredientToDelete, setIngredientToDelete] = useState(null); // Stocke l'utilisateur à supprimer

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
            toast.success("Ingrédient créé avec succès !");
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
        setIngredientToDelete(id); // Stocke l'identifiant de l'utilisateur à supprimer
        setShowDeletePopup(true); // Ouvre la pop-up de confirmation
    };

    const confirmDelete = async (id) => {
        try {
            setLoading(true);

            // Appelle l'API pour supprimer l'utilisateur
            await deleteIngredient(id);

            // Affiche un toast de succès
            toast.success("Ingrédient supprimé avec succès !");

            // Rafraîchit uniquement la liste des utilisateurs
            const updatedIngredients = await getAllIngredients();
            setIngredients(updatedIngredients);
        } catch (error) {
            // Affiche un toast en cas d'erreur
            toast.error(`Erreur lors de la suppression : ${error.message}`);
        } finally {
            setLoading(false);
            setShowDeletePopup(false); // Ferme la pop-up
            setIngredientToDelete(null); // Réinitialise l'utilisateur ciblé
        }
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
                            <button onClick={() => handleEdit(ingredient.id)} className="edit-btn"><Pencil/></button>
                            <button onClick={() => handleDelete(ingredient.id)} className="delete-btn"><X/></button>
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
            {showDeletePopup && (
                <PopupDelete
                    onClose={() => setShowDeletePopup(false)} // Ferme la pop-up
                    onConfirm={() => confirmDelete(ingredientToDelete)} // Supprime l'utilisateur confirmé
                />
            )}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Tableau;