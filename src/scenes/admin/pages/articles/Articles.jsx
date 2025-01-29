import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import { getAllArticles } from "services/articles/articlesService";

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getAllArticles()
            .then((data) => {
                setArticles(data);
            })
            .catch((error) => {
                console.error("Une erreur est survenue :", error);
            });
    }, []);

    return (
        <div className="dashboard-global">
            <NavBar />
            <p>Articles</p>
            {articles.map((article) => (
                <div key={article.id}>
                    <p>{article.title}</p>
                    <p>{article.price}</p>
                </div>
            ))}
        </div>
    );
};

export default Articles;