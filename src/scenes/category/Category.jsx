import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import { getCategory } from "../../services/articles/articlesService";
import { useParams } from "react-router-dom";
import Error from "./components/error/Error";
import Card from "./components/cards/Card";

const Category = () => {
    const [categoryData, setCategoryData] = useState(null);
    const { category } = useParams();

    useEffect(() => {
        if (category) {
            getCategory(category)
                .then((data) => {
                    setCategoryData(data);
                    console.log("Données de la catégorie :", data);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération de la catégorie :", error);
                });
        }
    }, [category]);

    if (!categoryData) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <Header />
            <h1>{categoryData.name}</h1>
            <h2>Articles :</h2>
            {/* Rendu conditionnel si aucun article n'est présent */}
            {categoryData.articles.length === 0 ? (
                <Error cat = {categoryData.name}/>
            ) : (
                <ul>
                    {categoryData.articles.map((article) => (
                        <Card id={article.id} title={article.title} description={article.description} imagePath={article.imagePath}/>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Category;
