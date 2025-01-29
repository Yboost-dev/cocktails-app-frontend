import React, { useEffect, useState } from 'react';
import './Tableau.scss';
import { getAllUsers } from "services/auth/accountService";
import {Link} from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';

const Tableau = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers()
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error("Une erreur est survenue, oupsi.. :", error)
            })
    }, []);

    const handleEdit = (id) => {
        console.log(`Modifier l'utilisateur : ${id}`);
        // Ajoutez la logique de l'édition ici
    };

    const handleDelete = (id) => {
        console.log(`Supprimer l'utilisateur : ${id}`);
        // Ajoutez la logique de la suppression ici
    };

    const capitalizeFirstLetter = text => text.charAt(0).toUpperCase() + text.slice(1);

    return (
        <div className="tableau">
            <div className="tableau-header">
                <h3>Tableau des utilisateurs</h3>
                <Link to="/admin/accounts/add" className="btn-admin-link">
                    Ajouter un utilisateur
                </Link>
            </div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.lastname.toUpperCase()}</td>
                        <td>{capitalizeFirstLetter(user.firstname)}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <button onClick={() => handleEdit(user.id)} className="edit-btn"><FaEdit /></button>
                            <button onClick={() => handleDelete(user.id)} className="delete-btn"><FaTrash /></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tableau;