import React, { useState, useEffect } from 'react';
import { getAllArticles, deleteArticle } from "../../../../../../services/articles/articlesService";
import { getCategoryById } from "../../../../../../services/category/categoryService";
import { X, Pencil, Plus, AlertCircle, RefreshCw, CheckCircle } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import CreateArticleForm from "../../components/fromCreateArticle/CreateArticleForm";
import EditArticleForm from "../../components/fromCreateArticle/UpdateArticleForm";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const Tableau = () => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [articleToEdit, setArticleToEdit] = useState(null);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const data = await getAllArticles();
            setArticles(data);
            setLoading(false);
        } catch (error) {
            console.error("Une erreur est survenue lors du chargement des articles :", error);
            toast.error("Impossible de charger les articles");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    // Fonction pour récupérer le nom d'une catégorie
    const fetchCategory = async (categoryId) => {
        if (categories[categoryId]) {
            return; // Si la catégorie est déjà dans le cache, ne rien faire
        }

        try {
            const data = await getCategoryById(categoryId);
            setCategories((prevCategories) => ({
                ...prevCategories,
                [categoryId]: data.name,
            }));
        } catch (error) {
            console.error(`Erreur lors de la récupération de la catégorie ${categoryId}:`, error);
        }
    };

    // Charger les catégories pour chaque article
    useEffect(() => {
        articles.forEach((article) => {
            if (article.categoryId) {
                fetchCategory(article.categoryId);
            }
        });
    }, [articles]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleEdit = (id) => {
        setArticleToEdit(id);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        setArticleToDelete(id);
        setShowDeletePopup(true);
    };

    const confirmDelete = async (id) => {
        try {
            setLoading(true);
            await deleteArticle(id);
            toast.success("Cocktail supprimé avec succès !");
            await fetchArticles();
        } catch (error) {
            toast.error(`Erreur lors de la suppression : ${error.message}`);
        } finally {
            setLoading(false);
            setShowDeletePopup(false);
            setArticleToDelete(null);
        }
    };

    // Fonction pour gérer la création d'un article
    const handleArticleCreated = () => {
        fetchArticles();
        setShowCreateModal(false);
    };

    // Fonction pour gérer la mise à jour d'un article
    const handleArticleUpdated = () => {
        fetchArticles();
        setShowEditModal(false);
        setArticleToEdit(null);
    };

    // Filtrage des articles
    const filteredArticles = articles.filter(article => {
        // Filtrer par recherche
        if (searchTerm && !article.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }

        // Filtrer par état de publication
        if (filter === 'published' && !article.published) {
            return false;
        } else if (filter === 'unpublished' && article.published) {
            return false;
        }

        return true;
    });

    const PopupDelete = ({ onClose, onConfirm }) => {
        return (
            <div className="delete-confirmation">
                <h3>Confirmer la suppression</h3>
                <p>
                    Êtes-vous sûr de vouloir supprimer ce cocktail ? Cette action est irréversible.
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

    return (
        <div className="articles-dashboard">
            <div className="articles-header">
                <h1>Gestion des Cocktails</h1>
                <div className="articles-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Rechercher un cocktail..."
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
                            <option value="all">Tous les cocktails</option>
                            <option value="published">Publiés</option>
                            <option value="unpublished">Non publiés</option>
                        </select>
                    </div>
                    <button
                        className="add-article-button"
                        onClick={() => setShowCreateModal(true)}
                    >
                        <Plus size={18} /> Ajouter
                    </button>
                    <button
                        className="refresh-button"
                        onClick={fetchArticles}
                    >
                        <RefreshCw size={18} /> Actualiser
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Chargement des cocktails...</p>
                </div>
            ) : (
                <>
                    {filteredArticles.length === 0 ? (
                        <div className="no-articles">
                            <p>Aucun cocktail ne correspond à vos critères.</p>
                        </div>
                    ) : (
                        <div className="articles-table-container">
                            <table className="articles-table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>Nom</th>
                                    <th>Description</th>
                                    <th>Ingrédients</th>
                                    <th>Catégorie</th>
                                    <th>Prix</th>
                                    <th>État</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredArticles.map((article) => (
                                    <tr key={article.id}>
                                        <td>{article.id}</td>
                                        <td>
                                            {article.imagePath ? (
                                                <img
                                                    src={API_BASE_URL + article.imagePath}
                                                    alt={article.title}
                                                    className="article-thumbnail"
                                                />
                                            ) : (
                                                "Aucune image"
                                            )}
                                        </td>
                                        <td>{article.title}</td>
                                        <td className="truncate">{article.description}</td>
                                        <td>
                                            <div className="ingredients-list">
                                                {Array.isArray(article.ingredients)
                                                    ? article.ingredients.map((ingredient, index) => (
                                                        <span key={index}>
                                                            {ingredient.name}
                                                            {index < article.ingredients.length - 1 && ", "}
                                                        </span>
                                                    ))
                                                    : "Aucun ingrédient disponible"}
                                            </div>
                                        </td>
                                        <td>{categories[article.categoryId] || "Chargement..."}</td>
                                        <td>{article.price.toFixed(2)} €</td>
                                        <td>
                                            <div className={`publish-badge ${article.published ? 'published' : 'unpublished'}`}>
                                                {article.published ? (
                                                    <><CheckCircle size={14} /> Publié</>
                                                ) : (
                                                    <><AlertCircle size={14} /> Non publié</>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="edit-btn"
                                                    title="Modifier le cocktail"
                                                    onClick={() => handleEdit(article.id)}
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    className="delete-btn"
                                                    title="Supprimer le cocktail"
                                                    onClick={() => handleDelete(article.id)}
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
                    <CreateArticleForm
                        onClose={() => setShowCreateModal(false)}
                        onSuccess={handleArticleCreated}
                    />
                </div>
            )}

            {showEditModal && articleToEdit && (
                <div className="article-modal-overlay">
                    <EditArticleForm
                        articleId={articleToEdit}
                        onClose={() => {
                            setShowEditModal(false);
                            setArticleToEdit(null);
                        }}
                        onSuccess={handleArticleUpdated}
                    />
                </div>
            )}

            {showDeletePopup && (
                <div className="delete-modal-overlay">
                    <PopupDelete
                        onClose={() => setShowDeletePopup(false)}
                        onConfirm={() => confirmDelete(articleToDelete)}
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
