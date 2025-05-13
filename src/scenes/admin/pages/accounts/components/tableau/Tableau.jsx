import React, {useEffect, useState} from 'react';
import './Tableau.scss';
import FormCreateUser from './components/formCreateUser/formCreateUser';
import {getAllUsers} from "services/auth/accountService";
import {register, deleteUser} from "services/auth/authService";
import {UserX} from 'lucide-react';

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopupDelete from "./components/popupDelete/popupDelete";


const Tableau = ({onSuccess, onError}) => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [setLoading] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);


    useEffect(() => {
        getAllUsers()
            .then((data) => setUsers(data))
            .catch((error) => console.error("Une erreur est survenue, oupsi.. :", error));
    }, []);

    const handleDelete = (id) => {
        setUserToDelete(id);
        setShowDeletePopup(true);
    };

    const confirmDelete = async (id) => {
        try {
            setLoading(true);

            await deleteUser(id);

            toast.success("Utilisateur supprimé avec succès !");

            const updatedUsers = await getAllUsers();
            setUsers(updatedUsers);
        } catch (error) {
            toast.error(`Erreur lors de la suppression : ${error.message}`);
        } finally {
            setLoading(false);
            setShowDeletePopup(false);
            setUserToDelete(null);
        }
    };

    const handleSave = async (user) => {
        try {
            setLoading(true);

            const newUser = await register(user);

            setUsers((prevUsers) => [...prevUsers, newUser]);

            toast.success("Utilisateur créé avec succès !");
        } catch (error) {
            toast.error(`Erreur : ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tableau">
            <div className="tableau-header">
                <h3>Tableau des utilisateurs</h3>
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
                            <button onClick={() => handleDelete(user.id)} className="delete-btn"><UserX/></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal">
                    <FormCreateUser
                        onClose={() => setShowModal(false)}
                        onSave={handleSave}
                    />
                </div>
            )}
            {showDeletePopup && (
                <PopupDelete
                    onClose={() => setShowDeletePopup(false)}
                    onConfirm={() => confirmDelete(userToDelete)}
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