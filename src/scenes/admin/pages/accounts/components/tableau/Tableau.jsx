import React, { useEffect, useState } from 'react';
import './Tableau.scss';
import FormCreateUser from './components/formCreateUser';
import { getAllUsers } from "services/auth/accountService";
import { FaEdit, FaTrash } from 'react-icons/fa';

const Tableau = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false); // État pour gérer la pop-up

    useEffect(() => {
        getAllUsers()
            .then((data) => setUsers(data))
            .catch((error) => console.error("Une erreur est survenue, oupsi.. :", error));
    }, []);

    const handleEdit = (id) => {
        console.log(`Modifier l'utilisateur : ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Supprimer l'utilisateur : ${id}`);
    };

    const handleSave = (user) => {
        console.log('Enregistrer un nouvel utilisateur :', user);
        // Ajoutez ici la logique pour envoyer les données du formulaire à une API ou mettre à jour la liste des utilisateurs
        setUsers((prevUsers) => [...prevUsers, { id: prevUsers.length + 1, ...user }]); // Mise à jour locale pour l'exemple
    };

    return (
        <div className="tableau">
            <div className="tableau-header">
                <h3>Tableau des utilisateurs</h3>
                {/* Bouton pour ouvrir la pop-up */}
                <button onClick={() => setShowModal(true)} className="btn-admin">
                    Ajouter un utilisateur
                </button>
            </div>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.lastname.toUpperCase()}</td>
                        <td>{user.firstname}</td>
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

            {/* Pop-up contenant le formulaire */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <FormCreateUser
                            onClose={() => setShowModal(false)} // Ferme la pop-up
                            onSave={handleSave} // Fonction pour gérer la sauvegarde
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tableau;