import React, {useEffect, useState} from 'react';
import './lastArticle.scss';
import {getAllArticles} from "../../../../services/articles/articlesService";
import {toast} from "react-toastify";
import Card from "../../../category/components/cards/Card";

const LastArticle = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                const data = await getAllArticles();
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setArticles(data);
                setLoading(false);
            } catch (error) {
                toast.error("Erreur lors de la récupération des articles");
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className="last-articles-container">
            <h1>Derniers cocktails</h1>
            {loading ? (
                <div className="loading-spinner">Chargement...</div>
            ) : (
                <div className="articles-grid">
                    {articles.length > 0 ? (
                        articles.slice(0, 4).map((article) => (
                            <Card
                                key={article.id}
                                id={article.id}
                                title={article.title}
                                description={article.description}
                                imagePath={article.imagePath}
                                price={article.price}
                                ingredients={article.ingredients}
                            />
                        ))
                    ) : (
                        <p>Aucun cocktail disponible pour le moment.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default LastArticle;