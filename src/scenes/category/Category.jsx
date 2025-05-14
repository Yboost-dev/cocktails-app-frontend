import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useParams, useNavigate } from "react-router-dom";
import { getCategory } from "../../services/articles/articlesService";
import Error from "./components/error/Error";
import Card from "./components/cards/Card";
import { toast } from "react-toastify";
import "./Category.scss";

const Category = () => {
    const [categoryData, setCategoryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [sortOption, setSortOption] = useState("default");
    const [sortedArticles, setSortedArticles] = useState([]);

    const { category } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoryData = async () => {
            if (!category) return;

            setLoading(true);
            setError(false);

            try {
                const data = await getCategory(category);

                if (data && typeof data === 'object') {
                    setCategoryData(data);
                    const articles = Array.isArray(data.articles) ? data.articles : [];
                    setSortedArticles(articles);
                } else {
                    throw new Error("Format de données invalide");
                }
            } catch (error) {
                setError(true);
                toast.error("Cette catégorie n'existe pas");
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryData();
    }, [category]);

    useEffect(() => {
        if (!categoryData || !Array.isArray(sortedArticles)) return;

        const articles = [...sortedArticles];

        switch (sortOption) {
            case "title_asc":
                articles.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "title_desc":
                articles.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "recent":
                articles.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
                break;
            case "oldest":
                articles.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
                break;
            default:
                break;
        }

        setSortedArticles(articles);
    }, [sortOption, categoryData]);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleBackToCocktails = () => {
        navigate("/cocktail");
    };

    if (loading) {
        return (
            <div>
                <Header />
                <div className="category-loading">
                    <div className="loading-spinner"></div>
                    <p>Chargement des produits...</p>
                </div>
            </div>
        );
    }

    if (error || !categoryData) {
        return (
            <div>
                <Header />
                <div className="category-error">
                    <h2>Catégorie introuvable</h2>
                    <p>Nous n'avons pas pu trouver la catégorie <strong>"{category}"</strong></p>
                    <button
                        onClick={handleBackToCocktails}
                        className="back-button"
                    >
                        <i className="fa fa-arrow-left"></i> Retour aux cocktails
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <section className="category-container">
                <div className="category-header">
                    <span>Résultats de recherche :</span>
                    <span>{categoryData.name || category || "Catégorie"}</span>
                </div>
                <div className="category-body">
                    <div className="category-filters">
                        <select
                            value={sortOption}
                            onChange={handleSortChange}
                            className="sort-select"
                        >
                            <option value="default">Trier par</option>
                            <option value="title_asc">Titre (A-Z)</option>
                            <option value="title_desc">Titre (Z-A)</option>
                            <option value="recent">Plus récent</option>
                            <option value="oldest">Plus ancien</option>
                        </select>
                    </div>
                    <div className="category-content">
                        {(!sortedArticles || sortedArticles.length === 0) ? (
                            <Error cat={categoryData.name || category || "cette catégorie"} />
                        ) : (
                            <ul className="category-articles-list">
                                {sortedArticles.map((article) => (
                                    <Card
                                        key={article.id || `article-${Math.random()}`}
                                        id={article.id}
                                        title={article.title || "Sans titre"}
                                        description={article.description || ""}
                                        imagePath={article.imagePath || ""}
                                        price={article.price || 0}
                                        ingredients={article.ingredients || []}
                                    />
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Category;