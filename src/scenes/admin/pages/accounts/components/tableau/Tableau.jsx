import React, {useEffect, useState} from 'react';
import './Tableau.scss';
import FormCreateUser from './components/formCreateUser/formCreateUser';
import {getAllUsers} from "services/auth/accountService";
import {register, deleteUser} from "services/auth/authService";
import {UserX, UserPen} from 'lucide-react';

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopupDelete from "./components/popupDelete/popupDelete";


const Tableau = ({onSuccess, onError}) => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false); // État pour gérer la pop-up
    const [loading, setLoading] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false); // Gestion de la pop-up de suppression
    const [userToDelete, setUserToDelete] = useState(null); // Stocke l'utilisateur à supprimer


    useEffect(() => {
        getAllUsers()
            .then((data) => setUsers(data))
            .catch((error) => console.error("Une erreur est survenue, oupsi.. :", error));
    }, []);

    const handleEdit = (id) => {
        console.log(`Modifier l'utilisateur : ${id}`);
    };

    const handleDelete = (id) => {
        setUserToDelete(id); // Stocke l'identifiant de l'utilisateur à supprimer
        setShowDeletePopup(true); // Ouvre la pop-up de confirmation
    };

    const confirmDelete = async (id) => {
        try {
            setLoading(true);

            // Appelle l'API pour supprimer l'utilisateur
            await deleteUser(id);

            // Affiche un toast de succès
            toast.success("Utilisateur supprimé avec succès !");

            // Rafraîchit uniquement la liste des utilisateurs
            const updatedUsers = await getAllUsers();
            setUsers(updatedUsers);
        } catch (error) {
            // Affiche un toast en cas d'erreur
            toast.error(`Erreur lors de la suppression : ${error.message}`);
        } finally {
            setLoading(false);
            setShowDeletePopup(false); // Ferme la pop-up
            setUserToDelete(null); // Réinitialise l'utilisateur ciblé
        }
    };

    const handleSave = async (user) => {
        try {
            setLoading(true); // Active l'état de chargement

            // Appelle la fonction `register` pour créer l'utilisateur
            const newUser = await register(user);

            // Met à jour l'état local des utilisateurs pour afficher le nouvel utilisateur
            setUsers((prevUsers) => [...prevUsers, newUser]);

            // Afficher un toast de succès
            toast.success("Utilisateur créé avec succès !");
        } catch (error) {
            // Afficher un toast d'erreur
            toast.error(`Erreur : ${error.message}`);
        } finally {
            setLoading(false); // Désactive l'état de chargement
        }
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
                            <button onClick={() => handleEdit(user.id)} className="edit-btn"><UserPen/></button>
                            <button onClick={() => handleDelete(user.id)} className="delete-btn"><UserX/></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pop-up contenant le formulaire */}
            {showModal && (
                <div className="modal">
                    <FormCreateUser
                        onClose={() => setShowModal(false)} // Ferme la pop-up
                        onSave={handleSave} // Fonction pour gérer la sauvegarde
                    />
                </div>
            )}
            {showDeletePopup && (
                <PopupDelete
                    onClose={() => setShowDeletePopup(false)} // Ferme la pop-up
                    onConfirm={() => confirmDelete(userToDelete)} // Supprime l'utilisateur confirmé
                />
            )}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </div>
    );
};

export default Tableau;