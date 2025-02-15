import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa";
import {getAllCategory} from "services/category/categoryService";

const Tableau = () => {

    const [categories, setCategory] = useState([]);

    useEffect(() => {
        getAllCategory()
            .then((data) => {
                setCategory(data);
            })
            .catch((error) => {
                console.error("Une erreur est survenue :", error);
            });
    }, []);

    const handleEdit = (id) => {
        console.log(`Modifier l'utilisateur : ${id}`);
        // Ajoutez la logique de l'édition ici
    };

    const handleDelete = (id) => {
        console.log(`Supprimer l'utilisateur : ${id}`);
        // Ajoutez la logique de la suppression ici
    };

    return (
        <div className="tableau">
            <div className="tableau-header">
                <h3>Tableau des categories</h3>
                <Link to="/admin/accounts/add" className="btn-admin-link">
                    Ajouter une catégorie
                </Link>
            </div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom de la catégorie</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>
                            <button onClick={() => handleEdit(category.id)} className="edit-btn"><FaEdit /></button>
                            <button onClick={() => handleDelete(category.id)} className="delete-btn"><FaTrash /></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tableau;