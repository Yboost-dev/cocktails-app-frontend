import React, { useState, useEffect } from 'react';
import { getAllCategory, getCategoryById, createCategory, updateCategory, deleteCategory } from "../../../../../../services/category/categoryService";
import { X, Pencil, Plus, RefreshCw } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tableau = () => {
    // États pour la gestion des catégories
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // États pour les modales
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState(null);

    // Charger toutes les catégories
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await getAllCategory();
            setCategories(data);
            setLoading(false);
        } catch (error) {
            console.error("Une erreur est survenue lors du chargement des catégories :", error);
            toast.error("Impossible de charger les catégories");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleEdit = (id) => {
        setCategoryToEdit(id);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        setCategoryToDelete(id);
        setShowDeletePopup(true);
    };

    const confirmDelete = async (id) => {
        try {
            setLoading(true);
            await deleteCategory(id);
            toast.success("Catégorie supprimée avec succès !");
            await fetchCategories();
        } catch (error) {
            toast.error(`Erreur lors de la suppression : ${error.message}`);
        } finally {
            setLoading(false);
            setShowDeletePopup(false);
            setCategoryToDelete(null);
        }
    };

    // Gérer la création d'une catégorie
    const handleCategoryCreated = () => {
        fetchCategories();
        setShowCreateModal(false);
    };

    // Gérer la mise à jour d'une catégorie
    const handleCategoryUpdated = () => {
        fetchCategories();
        setShowEditModal(false);
        setCategoryToEdit(null);
    };

    // Filtrer les catégories par nom
    const filteredCategories = categories.filter(category => {
        if (searchTerm && !category.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        return true;
    });

    // Composant popup de confirmation de suppression
    const PopupDelete = ({ onClose, onConfirm }) => {
        return (
            <div className="delete-confirmation">
                <h3>Confirmer la suppression</h3>
                <p>
                    Êtes-vous sûr de vouloir supprimer cette catégorie ? Cette action est irréversible.
                </p>
                <div className="confirmation-actions">
                    <button type="button" className="cancel-button" onClick={onClose}>
                        Annuler
                    </button>
                    <button type="button" className="delete-button" onClick={onConfirm}>
                        Supprimer
                    </button>
                </div>
            </div>
        );
    };

    // Composant de création de catégorie
    const CreateCategoryForm = ({ onClose, onSuccess }) => {
        const [category, setCategory] = useState({
            name: ""
        });
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState("");

        const handleChange = (e) => {
            const { name, value } = e.target;
            setCategory({
                ...category,
                [name]: value
            });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError("");
            setLoading(true);

            if (!category.name) {
                toast.error("Veuillez saisir un nom pour la catégorie");
                setLoading(false);
                return;
            }

            try {
                await createCategory(category);
                toast.success("Catégorie créée avec succès !");

                if (onSuccess) {
                    onSuccess();
                }
            } catch (error) {
                console.error("Erreur lors de la création:", error);
                let errorMessage = error.message || "Erreur lors de la création de la catégorie";
                setError(errorMessage);
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="article-modal">
                <div className="article-modal-header">
                    <h2>Ajouter une catégorie</h2>
                    <button className="close-button" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="article-modal-content">
                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nom de la catégorie *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={category.name}
                                onChange={handleChange}
                                placeholder="Nom de la catégorie"
                                required
                                minLength={3}
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={onClose}
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="save-button"
                                disabled={loading}
                            >
                                {loading ? "Création en cours..." : "Créer la catégorie"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    // Composant de modification de catégorie
    const EditCategoryForm = ({ categoryId, onClose, onSuccess }) => {
        const [category, setCategory] = useState({
            id: categoryId,
            name: ""
        });
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState("");
        const [initialLoading, setInitialLoading] = useState(true);

        // Charger les données de la catégorie à modifier
        useEffect(() => {
            const fetchCategoryData = async () => {
                try {
                    setInitialLoading(true);
                    const categoryData = await getCategoryById(categoryId);

                    // Vérifier si la réponse est un tableau et extraire le premier élément si nécessaire
                    const data = Array.isArray(categoryData) ? categoryData[0] : categoryData;

                    setCategory({
                        id: data.id,
                        name: data.name
                    });

                    setInitialLoading(false);
                } catch (error) {
                    toast.error("Erreur lors du chargement des données de la catégorie");
                    console.error("Erreur de chargement:", error);
                    setInitialLoading(false);
                }
            };

            fetchCategoryData();
        }, [categoryId]);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setCategory({
                ...category,
                [name]: value
            });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError("");
            setLoading(true);

            if (!category.name) {
                toast.error("Veuillez saisir un nom pour la catégorie");
                setLoading(false);
                return;
            }

            try {
                await updateCategory(category);
                toast.success("Catégorie mise à jour avec succès !");

                if (onSuccess) {
                    onSuccess();
                }
            } catch (error) {
                console.error("Erreur lors de la mise à jour:", error);
                let errorMessage = error.message || "Erreur lors de la mise à jour de la catégorie";
                setError(errorMessage);
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        if (initialLoading) {
            return (
                <div className="article-modal">
                    <div className="article-modal-header">
                        <h2>Modification de la catégorie</h2>
                        <button className="close-button" onClick={onClose}>
                            <X size={24} />
                        </button>
                    </div>
                    <div className="article-modal-content">
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Chargement des données...</p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="article-modal">
                <div className="article-modal-header">
                    <h2>Modifier la catégorie</h2>
                    <button className="close-button" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="article-modal-content">
                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nom de la catégorie *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={category.name}
                                onChange={handleChange}
                                placeholder="Nom de la catégorie"
                                required
                                minLength={3}
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={onClose}
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="save-button"
                                disabled={loading}
                            >
                                {loading ? "Mise à jour en cours..." : "Mettre à jour la catégorie"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="articles-dashboard">
            <div className="articles-header">
                <h1>Gestion des Catégories</h1>
                <div className="articles-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Rechercher une catégorie..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                    </div>
                    <button
                        className="add-article-button"
                        onClick={() => setShowCreateModal(true)}
                    >
                        <Plus size={18} /> Ajouter
                    </button>
                    <button
                        className="refresh-button"
                        onClick={fetchCategories}
                    >
                        <RefreshCw size={18} /> Actualiser
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Chargement des catégories...</p>
                </div>
            ) : (
                <>
                    {filteredCategories.length === 0 ? (
                        <div className="no-articles">
                            <p>Aucune catégorie ne correspond à vos critères.</p>
                        </div>
                    ) : (
                        <div className="articles-table-container">
                            <table className="articles-table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom de la catégorie</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredCategories.map((category) => (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="edit-btn"
                                                    title="Modifier la catégorie"
                                                    onClick={() => handleEdit(category.id)}
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    className="delete-btn"
                                                    title="Supprimer la catégorie"
                                                    onClick={() => handleDelete(category.id)}
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

            {showCreateModal && (
                <div className="article-modal-overlay">
                    <CreateCategoryForm
                        onClose={() => setShowCreateModal(false)}
                        onSuccess={handleCategoryCreated}
                    />
                </div>
            )}

            {showEditModal && categoryToEdit && (
                <div className="article-modal-overlay">
                    <EditCategoryForm
                        categoryId={categoryToEdit}
                        onClose={() => {
                            setShowEditModal(false);
                            setCategoryToEdit(null);
                        }}
                        onSuccess={handleCategoryUpdated}
                    />
                </div>
            )}

            {showDeletePopup && (
                <div className="delete-modal-overlay">
                    <PopupDelete
                        onClose={() => setShowDeletePopup(false)}
                        onConfirm={() => confirmDelete(categoryToDelete)}
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

export default Tableau;