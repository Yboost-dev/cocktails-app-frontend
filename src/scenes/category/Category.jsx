import Header from "components/header/Header";
import { useEffect, useState } from "react";
import { getCategory } from "services/articles/articlesService";
import { useParams } from "react-router-dom";

const Category = () => {
    const [categoryData, setCategoryData] = useState(null);
    const { category } = useParams();

    useEffect(() => {
        if (category) {
            getCategory(category)
                .then((data) => {
                    setCategoryData(data);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération de la catégorie :", error);
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
            <h2>Articles :</h2>
            <ul>
                {categoryData.articles.map((article) => (
                    <li key={article.id}>
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <p>Prix : {article.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Category;
