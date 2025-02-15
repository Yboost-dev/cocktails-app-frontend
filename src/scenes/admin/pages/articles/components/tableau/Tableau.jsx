import React, { useEffect, useState } from 'react';
import { getAllArticles } from "services/articles/articlesService";
import { getCategoryById } from "services/category/categoryService";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const Tableau = () => {
    const [articles, setArticles] = useState([]); // Liste des articles
    const [categories, setCategories] = useState({}); // Cache des catégories (id -> nom)

    // Charger les articles au chargement du composant
    useEffect(() => {
        getAllArticles()
            .then((data) => {
                setArticles(data);
            })
            .catch((error) => {
                console.error("Une erreur est survenue lors du chargement des articles :", error);
            });
    }, []);

    // Fonction pour récupérer le nom d'une catégorie
    const fetchCategory = async (categoryId) => {
        if (categories[categoryId]) {
            return; // Si la catégorie est déjà dans le cache, ne rien faire
        }

        try {
            const data = await getCategoryById(categoryId); // Appel à l'API
            setCategories((prevCategories) => ({
                ...prevCategories,
                [categoryId]: data.name, // Ajouter la catégorie au cache
            }));
        } catch (error) {
            console.error(`Erreur lors de la récupération de la catégorie ${categoryId}:`, error);
        }
    };

    // Charger les catégories pour chaque article au moment du chargement des articles
    useEffect(() => {
        articles.forEach((article) => {
            if (article.categoryId) {
                fetchCategory(article.categoryId);
            }
        });
    }, [articles, fetchCategory]);

    const handleEdit = (id) => {
        console.log(`Modifier l'utilisateur : ${id}`);
        // Ajoutez votre logique ici
    };

    const handleDelete = (id) => {
        console.log(`Supprimer l'utilisateur : ${id}`);
        // Ajoutez votre logique ici
    };

    return (
        <div className="tableau">
            <div className="tableau-header">
                <h3>Tableau des articles</h3>
                <Link to="/admin/articles/add" className="btn-admin-link">
                    Ajouter un article
                </Link>
            </div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Nom de l'article</th>
                    <th>Description</th>
                    <th>Ingrédients</th>
                    <th>État</th>
                    <th>Catégorie</th>
                    <th>Prix</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {articles.map((article) => (
                    <tr key={article.id}>
                        <td>{article.id}</td>
                        <td>{article.image || "Aucune image"}</td>
                        <td>{article.title}</td>
                        <td>{article.description}</td>
                        <td>
                            {Array.isArray(article.ingredients)
                                ? article.ingredients.map((ingredient, index) => (
                                    <span key={index}>
                                            {ingredient.name}
                                        {index < article.ingredients.length - 1 && ", "}
                                        </span>
                                ))
                                : "Aucun ingrédient disponible"}
                        </td>
                        <td>{article.published ? "Publié" : "Non publié"}</td>
                        {/* Afficher la catégorie */}
                        <td>
                            {categories[article.categoryId] || "Chargement..."}
                        </td>
                        <td>{article.price.toFixed(2)} €</td>
                        <td>
                            <button onClick={() => handleEdit(article.id)} className="edit-btn">
                                <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(article.id)} className="delete-btn">
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tableau;