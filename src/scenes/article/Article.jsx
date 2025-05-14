import React, {useEffect, useState} from 'react';
import Header from "../../components/header/Header";
import {useParams, Link} from "react-router-dom";
import {getArticleById} from "../../services/articles/articlesService";
import {getAllIngredients} from "../../services/ingredients/ingredientsService";
import {FaArrowLeft, FaShoppingCart} from "react-icons/fa";
import "./Article.scss";
import {useCart} from "../../context/cartContext";

const Article = () => {
    const {addToCart, toggleCartVisibility} = useCart();

    const [articleData, setArticleData] = useState(null);
    const [errorData, setErrorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity] = useState(1);
    const [isAvailable, setIsAvailable] = useState(true);
    const [ingredientsStock, setIngredientsStock] = useState({});
    const [ingredientsResponse, setIngredientsResponse] = useState([]);
    const {id} = useParams();

    const handleAddToCart = () => {
        if (!articleData || !isAvailable) return;

        const itemToAdd = {
            id: articleData.id,
            title: articleData.title,
            price: articleData.price,
            quantity: quantity,
            imagePath: articleData.imagePath
        };

        addToCart(itemToAdd);
        toggleCartVisibility();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const articleResponse = await getArticleById(id);

                if (!articleResponse) {
                    throw new Error(JSON.stringify({err: {message: "Ce cocktail n'existe pas"}}));
                }

                setArticleData(articleResponse);

                try {
                    const ingredients = await getAllIngredients();
                    setIngredientsResponse(Array.isArray(ingredients) ? ingredients : []);

                    const stockMap = {};
                    if (Array.isArray(ingredients)) {
                        ingredients.forEach(ingredient => {
                            if (ingredient && ingredient.id) {
                                stockMap[ingredient.id] = ingredient.quantity || 0;
                            }
                        });
                    }
                    setIngredientsStock(stockMap);

                    if (articleResponse && articleResponse.ingredients && Array.isArray(articleResponse.ingredients) && Array.isArray(ingredients)) {
                        const available = checkCocktailAvailability(articleResponse, stockMap, ingredients);
                        setIsAvailable(available);
                    }
                } catch (ingredientError) {
                    setIngredientsResponse([]);
                }

                setLoading(false);
            } catch (error) {
                try {
                    const parsedError = typeof error.message === 'string' ? JSON.parse(error.message) : {err: {message: "Une erreur est survenue"}};
                    setErrorData(parsedError);
                } catch (e) {
                    setErrorData({err: {message: "Une erreur est survenue"}});
                }
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    const checkCocktailAvailability = (article, stockMap, ingredients) => {
        if (!article || !article.ingredients || !Array.isArray(article.ingredients) || article.ingredients.length === 0) {
            return true;
        }

        const ingredientNameToStock = {};
        if (Array.isArray(ingredients)) {
            ingredients.forEach(ingredient => {
                if (ingredient && ingredient.name) {
                    ingredientNameToStock[ingredient.name.toLowerCase()] = ingredient.quantity || 0;
                }
            });
        }

        for (const ingredient of article.ingredients) {
            let ingredientName = '';
            let requiredQuantity = 0;

            if (ingredient && ingredient.name) {
                ingredientName = ingredient.name.toLowerCase();
                requiredQuantity = ingredient.quantity || 0;
            } else if (ingredient && ingredient.ingredient && ingredient.ingredient.name) {
                ingredientName = ingredient.ingredient.name.toLowerCase();
                requiredQuantity = ingredient.quantity || 0;
            } else {
                continue;
            }

            const availableStock = ingredientNameToStock[ingredientName] || 0;

            if (availableStock < requiredQuantity) {
                return false;
            }
        }

        return true;
    };

    const totalPrice = articleData ? (articleData.price * quantity).toFixed(2) : "0.00";

    if (loading) {
        return (
            <div>
                <Header/>
                <div className="article-loading">
                    <div className="loading-spinner"></div>
                    <p>Chargement du cocktail...</p>
                </div>
            </div>
        );
    }

    if (errorData) {
        return (
            <div>
                <Header/>
                <div className="article-error">
                    <h2>Oups !</h2>
                    <p>{errorData.err?.message || "Ce cocktail n'existe pas"}</p>
                    <Link to="/" className="back-button">
                        <FaArrowLeft/> Retour a l'accueil
                    </Link>
                </div>
            </div>
        );
    }

    if (!articleData) {
        return (
            <div>
                <Header/>
                <div className="article-not-found">
                    <h2>Cocktail introuvable</h2>
                    <p>Nous n'avons pas pu trouver le cocktail que vous cherchez.</p>
                    <Link to="/categories" className="back-button">
                        <FaArrowLeft/> Retour aux catégories
                    </Link>
                </div>
            </div>
        );
    }

    const hasNestedIngredients = articleData.ingredients &&
        Array.isArray(articleData.ingredients) &&
        articleData.ingredients.some(ing => ing && ing.ingredient && ing.ingredient.name);

    const hasValidIngredients = articleData.ingredients &&
        Array.isArray(articleData.ingredients) &&
        articleData.ingredients.length > 0 &&
        (articleData.ingredients.some(ing => ing && ing.name) || hasNestedIngredients);

    return (
        <div className="article-page">
            <Header/>

            <div className="article-container">
                <div className="article-navigation">
                    <Link to="#" onClick={() => window.history.back()} className="back-link">
                        <FaArrowLeft/> Retour
                    </Link>
                </div>

                <div className="article-content">
                    <div className="article-image-section">
                        <div className="article-image-container">
                            <img
                                src={articleData.imagePath ? `${process.env.REACT_APP_API_URL}${articleData.imagePath}` : '/img/placeholder.jpg'}
                                alt={articleData.title}
                                className="article-image"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/img/placeholder.jpg';
                                }}
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
                            <h1 className="article-title">{articleData.title || 'Cocktail sans nom'}</h1>
                        </div>

                        <div className="article-price">
                            {totalPrice} €
                        </div>

                        <div className="article-description">
                            <p>{articleData.description || 'Aucune description disponible'}</p>
                        </div>

                        <div className="article-ingredients">
                            <h3>Ingrédients</h3>
                            <ul className="ingredients-list">
                                {hasValidIngredients ? (
                                    articleData.ingredients.map((ingredient, index) => {
                                        // Déterminer le format de l'ingrédient
                                        let name = '';
                                        let quantity = 0;
                                        let unit = 'ml';

                                        if (ingredient && ingredient.name) {
                                            name = ingredient.name;
                                            quantity = ingredient.quantity || 0;
                                            unit = ingredient.unit || 'ml';
                                        } else if (ingredient && ingredient.ingredient && ingredient.ingredient.name) {
                                            name = ingredient.ingredient.name;
                                            quantity = ingredient.quantity || 0;
                                            unit = ingredient.ingredient.unit || 'ml';
                                        } else {
                                            return null;
                                        }

                                        const stockIngredient = Array.isArray(ingredientsResponse) &&
                                            ingredientsResponse.find(
                                                ing => ing && ing.name && name &&
                                                    ing.name.toLowerCase() === name.toLowerCase()
                                            );

                                        const isIngredientAvailable = stockIngredient &&
                                            stockIngredient.quantity >= quantity;

                                        return (
                                            <li key={index}
                                                className={`ingredient-item ${!isIngredientAvailable ? 'unavailable' : ''}`}>
                                                <span className="ingredient-name">
                                                    {name}
                                                    {!isIngredientAvailable && (
                                                        <span className="stock-warning"> (En rupture)</span>
                                                    )}
                                                </span>
                                                <span className="ingredient-quantity">
                                                    {quantity} {unit}
                                                </span>
                                            </li>
                                        );
                                    })
                                ) : (
                                    <li className="ingredient-item">Recette confidentielle</li>
                                )}
                            </ul>
                        </div>

                        <div className="article-actions">
                            <button
                                className={`add-to-cart-button ${!isAvailable ? 'disabled' : ''}`}
                                disabled={!isAvailable}
                                onClick={handleAddToCart}
                            >
                                <FaShoppingCart/> {isAvailable ? 'Ajouter au panier' : 'Indisponible'}
                            </button>
                        </div>

                        {!isAvailable && (
                            <div className="unavailable-message">
                                <p>Ce cocktail est temporairement indisponible car certains ingrédients sont en rupture
                                    de stock.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Article;