import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Plus, Trash2, X } from "lucide-react";
import { getAllCategory } from "../../../../../../services/category/categoryService";
import { getAllIngredients } from "../../../../../../services/ingredients/ingredientsService";
import { getArticleById, updateArticle } from "../../../../../../services/articles/articlesService";
import "./CreateArticleForm.scss";

const EditArticleForm = ({ articleId, onClose, onSuccess }) => {
    const [article, setArticle] = useState({
        id: articleId,
        title: "",
        description: "",
        price: 0,
        categoryId: "",
        published: false,
        ingredients: []
    });

    const [categories, setCategories] = useState([]);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const fetchArticleData = async () => {
            try {
                setInitialLoading(true);
                const response = await getArticleById(articleId);

                // Vérifier si la réponse est un tableau et extraire le premier élément si nécessaire
                const articleData = Array.isArray(response) ? response[0] : response;

                console.log("Données d'article formatées:", articleData);

                const categoriesData = await getAllCategory();
                const ingredientsData = await getAllIngredients();

                if (!articleData || !articleData.ingredients) {
                    throw new Error("Données d'article invalides ou manquantes");
                }

                // Préparer les ingrédients dans le bon format
                const formattedIngredients = articleData.ingredients.map(ing => ({
                    ingredientId: ing.ingredientId || ing.id,
                    quantity: ing.quantity
                }));

                setArticle({
                    id: articleData.id,
                    title: articleData.title,
                    description: articleData.description,
                    price: articleData.price,
                    categoryId: articleData.categoryId,
                    published: articleData.published,
                    ingredients: formattedIngredients
                });

                setCategories(categoriesData);
                setIngredientsList(ingredientsData);

                // Si l'article a une image, configurer l'aperçu
                if (articleData.imagePath) {
                    // Vérifiez si l'URL est déjà complète, sinon préfixez avec l'URL de base
                    const imageUrl = articleData.imagePath.startsWith('http')
                        ? articleData.imagePath
                        : `${process.env.REACT_APP_API_URL}/uploads/${articleData.imagePath}`;
                    setPreviewImage(imageUrl);
                }

                setInitialLoading(false);
            } catch (error) {
                toast.error("Erreur lors du chargement des données de l'article");
                console.error("Erreur de chargement:", error);
                setInitialLoading(false);
            }
        };

        fetchArticleData();
    }, [articleId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "categoryId") {
            setArticle({
                ...article,
                [name]: value ? parseInt(value, 10) : ""
            });
        } else if (name === "price") {
            setArticle({
                ...article,
                [name]: value
            });
        } else {
            setArticle({
                ...article,
                [name]: type === "checkbox" ? checked : value
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);

            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setPreviewImage(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }
    };

    const addIngredient = () => {
        setArticle({
            ...article,
            ingredients: [
                ...article.ingredients,
                { ingredientId: "", quantity: 1 }
            ]
        });
    };

    const removeIngredient = (index) => {
        const updatedIngredients = [...article.ingredients];
        updatedIngredients.splice(index, 1);

        setArticle({
            ...article,
            ingredients: updatedIngredients
        });
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...article.ingredients];

        if (field === "ingredientId" || field === "quantity") {
            updatedIngredients[index][field] = parseInt(value, 10);
        } else {
            updatedIngredients[index][field] = value;
        }

        setArticle({
            ...article,
            ingredients: updatedIngredients
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!article.title || !article.description || !article.categoryId) {
            toast.error("Veuillez remplir tous les champs obligatoires");
            setLoading(false);
            return;
        }

        if (article.ingredients.length === 0) {
            toast.error("Ajoutez au moins un ingrédient");
            setLoading(false);
            return;
        }

        const invalidIngredients = article.ingredients.filter(
            ing => !ing.ingredientId || !ing.quantity
        );

        if (invalidIngredients.length > 0) {
            toast.error("Veuillez compléter tous les champs d'ingrédients");
            setLoading(false);
            return;
        }

        try {
            const preparedArticle = {
                id: article.id,
                title: article.title,
                description: article.description,
                price: parseFloat(article.price),
                categoryId: parseInt(article.categoryId, 10),
                published: article.published,
                ingredients: article.ingredients.map(ing => ({
                    ingredientId: parseInt(ing.ingredientId, 10),
                    quantity: parseInt(ing.quantity, 10)
                }))
            };

            await updateArticle(preparedArticle, selectedFile);
            toast.success("Cocktail mis à jour avec succès !");

            if (onSuccess) {
                onSuccess();
            }

        } catch (error) {
            let errorMessage = error.message || "Erreur lors de la mise à jour du cocktail";
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
                    <h2>Modification du cocktail</h2>
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
                <h2>Modifier le cocktail</h2>
                <button className="close-button" onClick={onClose}>
                    <X size={24} />
                </button>
            </div>

            <div className="article-modal-content">
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="title">Titre *</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={article.title}
                                onChange={handleChange}
                                placeholder="Nom du cocktail"
                                required
                                minLength={5}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Prix (€) *</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={article.price}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={article.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Description du cocktail"
                            required
                            minLength={10}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="categoryId">Catégorie *</label>
                            <select
                                id="categoryId"
                                name="categoryId"
                                value={article.categoryId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionner une catégorie</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group checkbox-group">
                            <label htmlFor="published">Publié</label>
                            <input
                                type="checkbox"
                                id="published"
                                name="published"
                                checked={article.published}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="fileInput">Image du cocktail {!previewImage && "*"}</label>
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            onChange={handleFileChange}
                            required={!previewImage}
                        />

                        {previewImage && (
                            <div className="image-preview">
                                <img src={previewImage} alt="Aperçu du cocktail" />
                            </div>
                        )}
                    </div>

                    <div className="ingredients-section">
                        <div className="section-header">
                            <h3>Ingrédients *</h3>
                            <button
                                type="button"
                                className="add-button"
                                onClick={addIngredient}
                            >
                                <Plus size={18} /> Ajouter un ingrédient
                            </button>
                        </div>

                        {article.ingredients.length > 0 ? (
                            <div className="ingredients-list">
                                {article.ingredients.map((ingredient, index) => (
                                    <div key={index} className="ingredient-item">
                                        <div className="ingredient-select">
                                            <select
                                                value={ingredient.ingredientId}
                                                onChange={(e) =>
                                                    handleIngredientChange(index, "ingredientId", e.target.value)
                                                }
                                                required
                                            >
                                                <option value="">Sélectionner un ingrédient</option>
                                                {ingredientsList.map((ing) => (
                                                    <option key={ing.id} value={ing.id}>
                                                        {ing.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="ingredient-quantity">
                                            <input
                                                type="number"
                                                value={ingredient.quantity}
                                                onChange={(e) =>
                                                    handleIngredientChange(index, "quantity", e.target.value)
                                                }
                                                min="1"
                                                placeholder="Quantité"
                                                required
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            className="remove-button"
                                            onClick={() => removeIngredient(index)}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="no-ingredients">Aucun ingrédient ajouté</p>
                        )}
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
                            {loading ? "Mise à jour en cours..." : "Mettre à jour le cocktail"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditArticleForm;