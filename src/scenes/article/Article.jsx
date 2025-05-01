import React, { useEffect, useState } from 'react';
import Header from "../../components/header/Header";
import { useParams, Link } from "react-router-dom";
import { getArticleById } from "../../services/articles/articlesService";
import { getAllIngredients } from "../../services/ingredients/ingredientsService";
import { FaArrowLeft, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import "./Article.scss";
import {useCart} from "../../context/cartContext";

const Article = () => {
    const { addToCart, toggleCartVisibility } = useCart();

    const [articleData, setArticleData] = useState(null);
    const [errorData, setErrorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [isAvailable, setIsAvailable] = useState(true);
    const [ingredientsStock, setIngredientsStock] = useState({});
    const [ingredientsResponse, setIngredientsResponse] = useState([]);
    const { id } = useParams();

    const handleAddToCart = () => {
        if (!articleData || !isAvailable) return;

        const itemToAdd = {
            id: articleData.id,
            title: articleData.title,
            price: articleData.price,
        };

        addToCart(itemToAdd);
        toggleCartVisibility();
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Récupérer l'article
                const articleResponse = await getArticleById(id);
                const article = Array.isArray(articleResponse) ? articleResponse[0] : articleResponse;

                // Récupérer le stock des ingrédients
                const ingredients = await getAllIngredients();
                setIngredientsResponse(ingredients);

                console.log("Liste des ingrédients:", ingredients);
                console.log("Article:", article);

                // Créer un map des ID d'ingrédients à leur quantité en stock
                const stockMap = {};
                ingredients.forEach(ingredient => {
                    stockMap[ingredient.id] = ingredient.quantity || 0;
                });
                setIngredientsStock(stockMap);

                setArticleData(article);

                // Vérifier si le cocktail est disponible
                const available = checkCocktailAvailability(article, stockMap, ingredients);
                setIsAvailable(available);

                setLoading(false);
            } catch (error) {
                try {
                    const parsedError = JSON.parse(error.message);
                    setErrorData(parsedError);
                } catch (e) {
                    setErrorData({ err: { message: "Une erreur est survenue" } });
                }
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    // Vérifier si un cocktail est disponible en stock
    const checkCocktailAvailability = (article, stockMap, ingredients) => {
        if (!article || !article.ingredients || article.ingredients.length === 0) {
            return true;
        }

        // Créer un map des noms d'ingrédients à leur quantité en stock
        const ingredientNameToStock = {};
        ingredients.forEach(ingredient => {
            ingredientNameToStock[ingredient.name.toLowerCase()] = ingredient.quantity;
        });

        console.log("Map des noms d'ingrédients au stock:", ingredientNameToStock);

        // Vérifier chaque ingrédient du cocktail
        for (const ingredient of article.ingredients) {
            const ingredientName = ingredient.name.toLowerCase();
            const requiredQuantity = ingredient.quantity || 0;

            // Chercher le stock par nom (insensible à la casse)
            const availableStock = ingredientNameToStock[ingredientName] || 0;

            console.log(`Vérification de ${ingredientName}: requis=${requiredQuantity}, disponible=${availableStock}`);

            if (availableStock < requiredQuantity) {
                console.log(`Ingrédient ${ingredientName} insuffisant: ${availableStock} < ${requiredQuantity}`);
                return false;
            }
        }

        return true;
    };

    // Calculer le prix total en fonction de la quantité
    const totalPrice = articleData ? (articleData.price * quantity).toFixed(2) : "0.00";

    if (loading) {
        return (
            <div className="article-loading">
                <div className="loading-spinner"></div>
                <p>Chargement du cocktail...</p>
            </div>
        );
    }

    if (errorData) {
        return (
            <div>
                <Header />
                <div className="article-error">
                    <h2>Oups !</h2>
                    <p>{errorData.err?.message || "Ce cocktail n'existe pas"}</p>
                    <Link to="/categories" className="back-button">
                        <FaArrowLeft /> Retour aux catégories
                    </Link>
                </div>
            </div>
        );
    }

    if (!articleData) {
        return (
            <div>
                <Header />
                <div className="article-not-found">
                    <h2>Cocktail introuvable</h2>
                    <p>Nous n'avons pas pu trouver le cocktail que vous cherchez.</p>
                    <Link to="/categories" className="back-button">
                        <FaArrowLeft /> Retour aux catégories
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="article-page">
            <Header />

            <div className="article-container">
                <div className="article-navigation">
                    <Link to="#" onClick={() => window.history.back()} className="back-link">
                        <FaArrowLeft /> Retour
                    </Link>
                </div>

                <div className="article-content">
                    <div className="article-image-section">
                        <div className="article-image-container">
                            <img
                                src={`${process.env.REACT_APP_API_URL}${articleData.imagePath}`}
                                alt={articleData.title}
                                className="article-image"
                            />
                            {!isAvailable && (
                                <div className="unavailable-overlay">
                                    <span>Temporairement indisponible</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="article-details">
                        <div className="article-header">
                            <h1 className="article-title">{articleData.title}</h1>
                        </div>

                        <div className="article-price">
                            {totalPrice} €
                        </div>

                        <div className="article-description">
                            <p>{articleData.description}</p>
                        </div>

                        <div className="article-ingredients">
                            <h3>Ingrédients</h3>
                            <ul className="ingredients-list">
                                {articleData.ingredients && articleData.ingredients.map((ingredient, index) => {
                                    // Trouver l'ingrédient correspondant dans la liste complète
                                    const stockIngredient = ingredientsResponse.find(
                                        ing => ing.name.toLowerCase() === ingredient.name.toLowerCase()
                                    );

                                    const isIngredientAvailable = stockIngredient &&
                                        stockIngredient.quantity >= ingredient.quantity;

                                    return (
                                        <li key={index} className={`ingredient-item ${!isIngredientAvailable ? 'unavailable' : ''}`}>
                                            <span className="ingredient-name">
                                                {ingredient.name}
                                                {!isIngredientAvailable && (
                                                    <span className="stock-warning"> (En rupture)</span>
                                                )}
                                            </span>
                                            <span className="ingredient-quantity">
                                                {ingredient.quantity} {ingredient.unit || 'ml'}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="article-actions">

                            <button
                                className={`add-to-cart-button ${!isAvailable ? 'disabled' : ''}`}
                                disabled={!isAvailable}
                                onClick={handleAddToCart}
                            >
                                <FaShoppingCart /> {isAvailable ? 'Ajouter au panier' : 'Indisponible'}
                            </button>
                        </div>

                        {!isAvailable && (
                            <div className="unavailable-message">
                                <p>Ce cocktail est temporairement indisponible car certains ingrédients sont en rupture de stock.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Article;