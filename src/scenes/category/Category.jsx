import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import { getCategory } from "../../services/articles/articlesService";
import { useParams } from "react-router-dom";
import Error from "./components/error/Error";
import Card from "./components/cards/Card";
import "./Category.scss";
import {toast} from "react-toastify";

const Category = () => {
    const [categoryData, setCategoryData] = useState(null);
    const { category } = useParams();
    const [sortOption, setSortOption] = useState("default");
    const [sortedArticles, setSortedArticles] = useState([]);

    useEffect(() => {
        if (category) {
            getCategory(category)
                .then((data) => {
                    setCategoryData(data);
                    setSortedArticles(data.articles);
                })
                .catch((error) => {
                    toast.error("Erreur lors de la récupération de la catégorie")
                });
        }
    }, [category]);

    useEffect(() => {
        if (categoryData) {
            let articles = [...categoryData.articles];

            switch (sortOption) {
                case "title_asc":
                    articles.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case "title_desc":
                    articles.sort((a, b) => b.title.localeCompare(a.title));
                    break;
                case "recent":
                    articles.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                case "oldest":
                    articles.sort((a, b) => new Date(a.date) - new Date(b.date));
                    break;
                default:
                    break;
            }

            setSortedArticles(articles);
        }
    }, [sortOption, categoryData]);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    if (!categoryData) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <Header />
            <section className="category-container">
                <div className="category-header">
                    <span>Résultats de recherche :</span>
                    <span>{categoryData.name}</span>
                </div>
                <div className="category-body">
                    <div className="category-filters">
                        <select value={sortOption} onChange={handleSortChange} className="sort-select">
                            <option value="default">Trier par</option>
                            <option value="title_asc">Titre (A-Z)</option>
                            <option value="title_desc">Titre (Z-A)</option>
                            <option value="recent">Plus récent</option>
                            <option value="oldest">Plus ancien</option>
                        </select>
                    </div>
                    <div className="category-content">
                        {sortedArticles.length === 0 ? (
                            <Error cat={categoryData.name}/>
                        ) : (
                            <ul>
                                {sortedArticles.map((article) => (
                                    <Card
                                        key={article.id}
                                        id={article.id}
                                        title={article.title}
                                        description={article.description}
                                        imagePath={article.imagePath}
                                        price={article.price}
                                        ingredients={article.ingredients}
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