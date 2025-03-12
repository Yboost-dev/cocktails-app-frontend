import React, { useEffect, useState } from 'react';
import Header from "../../components/header/Header";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../services/articles/articlesService";
import Error from "../category/components/error/Error";
import Card from "../category/components/cards/Card";

const Articles = () => {
    const [articleData, setArticleData] = useState(null); // Initialisation avec null
    const [errorData, setErrorData] = useState(null); // Ajout d'un état pour les erreurs
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getArticleById(id)
                .then((data) => {
                    setArticleData(data); // En cas de succès, on sauvegarde les données renvoyées
                    setErrorData(null); // Réinitialise les erreurs
                })
                .catch((error) => {
                    const parsedError = JSON.parse(error.message); // Parse l'erreur retournée par l'API
                    console.error("Erreur capturée : ", parsedError);
                    setErrorData(parsedError); // Garde la trace de l'erreur dans l'état
                    setArticleData(null); // Réinitialise les données si une erreur survient
                });
        }
    }, [id]);

    // Rendu pendant le chargement
    if (articleData === null && errorData === null) {
        return <div>Chargement...</div>;
    }

    // Affichage en cas d'erreur
    if (errorData) {
        return (
            <div>
                <Header />
                <Error cat={errorData.err?.message || "Une erreur est survenue"} />
            </div>
        );
    }

    // Rendu des données si des articles existent
    return (
        <div>
            <Header />
            <h1>{articleData?.name || "Articles"}</h1>
            <h2>Articles :</h2>
            <ul>
                {Array.isArray(articleData) && articleData.map((article) => (
                    <Card
                        key={article.id}
                        id={article.id}
                        title={article.title}
                        description={article.description}
                        imagePath={article.imagePath}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Articles;