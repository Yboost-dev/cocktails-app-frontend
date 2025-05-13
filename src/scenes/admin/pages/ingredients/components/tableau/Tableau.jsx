import React, {useEffect, useState} from 'react';
import {getAllIngredients, deleteIngredient} from "services/ingredients/ingredientsService";
import FormCreateIngredient from "./components/formCreateIngredient/formCreateIngredient";
import {toast, ToastContainer} from "react-toastify";
import {createIngredient} from "../../../../../../services/ingredients/ingredientsService";
import { X, Pencil, Plus, AlertCircle, RefreshCw } from 'lucide-react';
import PopupDelete from "./components/popupDelete/popupDelete";
import './Tableau.scss';

const IngredientsTable = () => {
    const [ingredients, setIngredients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ingredientToDelete, setIngredientToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchIngredients();
    }, []);

    const fetchIngredients = async () => {
        try {
            setLoading(true);
            const data = await getAllIngredients();
            setIngredients(data);
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les ingrédients");
            setLoading(false);
        }
    };

    const handleSave = async (ingredient) => {
        try {
            setLoading(true);
            const newIngredient = await createIngredient(ingredient);
            setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
            toast.success("Ingrédient ajouté avec succès !");
        } catch (error) {
            toast.error(`Erreur : ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id) => {
        console.log(`Modifier l'ingrédient : ${id}`);
    };

    const handleDelete = (id) => {
        setIngredientToDelete(id);
        setShowDeletePopup(true);
    };

    const confirmDelete = async (id) => {
        try {
            setLoading(true);
            await deleteIngredient(id);
            toast.success("Ingrédient supprimé avec succès !");
            const updatedIngredients = await getAllIngredients();
            setIngredients(updatedIngredients);
        } catch (error) {
            toast.error(`Erreur lors de la suppression : ${error.message}`);
        } finally {
            setLoading(false);
            setShowDeletePopup(false);
            setIngredientToDelete(null);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const checkLowStock = (quantity) => {
        return quantity < 100;
    };

    const filteredIngredients = ingredients.filter(ingredient => {
        if (searchTerm && !ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }

        if (filter === 'low' && !checkLowStock(ingredient.quantity)) {
            return false;
        } else if (filter === 'normal' && checkLowStock(ingredient.quantity)) {
            return false;
        }

        return true;
    });

    return (
        <div className="ingredients-dashboard">
            <div className="ingredients-header">
                <h1>Gestion des Ingrédients</h1>
                <div className="ingredients-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Rechercher un ingrédient..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                    </div>
                    <div className="filter-container">
                        <select
                            value={filter}
                            onChange={handleFilterChange}
                            className="filter-select"
                        >
                            <option value="all">Tous les ingrédients</option>
                            <option value="low">Stock faible</option>
                            <option value="normal">Stock normal</option>
                        </select>
                    </div>
                    <button
                        className="add-ingredient-button"
                        onClick={() => setShowModal(true)}
                    >
                        <Plus size={18} /> Ajouter
                    </button>
                    <button
                        className="refresh-button"
                        onClick={fetchIngredients}
                    >
                        <RefreshCw size={18} /> Actualiser
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Chargement des ingrédients...</p>
                </div>
            ) : (
                <>
                    {filteredIngredients.length === 0 ? (
                        <div className="no-ingredients">
                            <p>Aucun ingrédient ne correspond à vos critères.</p>
                        </div>
                    ) : (
                        <div className="ingredients-table-container">
                            <table className="ingredients-table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom de l'ingrédient</th>
                                    <th>Quantité</th>
                                    <th>Unité</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredIngredients.map((ingredient) => (
                                    <tr key={ingredient.id}>
                                        <td>{ingredient.id}</td>
                                        <td>{ingredient.name}</td>
                                        <td>{ingredient.quantity}</td>
                                        <td>{ingredient.unit}</td>
                                        <td>
                                            <div className={`stock-badge ${checkLowStock(ingredient.quantity) ? 'low-stock' : 'normal-stock'}`}>
                                                {checkLowStock(ingredient.quantity) ?
                                                    <><AlertCircle size={14} /> Faible</> :
                                                    'Normal'}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="edit-btn"
                                                    title="Modifier l'ingrédient"
                                                    onClick={() => handleEdit(ingredient.id)}
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    className="delete-btn"
                                                    title="Supprimer l'ingrédient"
                                                    onClick={() => handleDelete(ingredient.id)}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}

            {showModal && (
                <div className="ingredient-modal-overlay">
                    <FormCreateIngredient
                        onClose={() => setShowModal(false)}
                        onSave={handleSave}
                    />
                </div>
            )}

            {showDeletePopup && (
                <div className="delete-modal-overlay">
                    <PopupDelete
                        onClose={() => setShowDeletePopup(false)}
                        onConfirm={() => confirmDelete(ingredientToDelete)}
                    />
                </div>
            )}

            <ToastContainer
                position="bottom-right"
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

export default IngredientsTable;