import React, { useState } from 'react';
import './formCreateUser.scss';

const FormCreateUser = ({ onClose, onSave }) => {
    // États locaux pour gérer les champs du formulaire
    const [formData, setFormData] = useState({
        lastname: '',
        firstname: '',
        email: '',
        password: '',
        role: ''
    });

    // Met à jour les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        // Effectuer une validation simple (vous pouvez également utiliser un validateur plus strict si nécessaire)
        if (formData.role !== 'admin' && formData.role !== 'employee') {
            alert('Le rôle doit être "admin" ou "employee".');
            return;
        }
        if (formData.password.length < 8 || formData.password.length > 128) {
            alert('Le mot de passe doit comporter entre 8 et 128 caractères.');
            return;
        }

        onSave(formData); // Appelle la fonction `onSave` passée en prop pour gérer les données
        onClose(); // Ferme la pop-up après l'enregistrement
    };

    return (
        <div className="ajouter-utilisateur-form">
            <h2>Ajouter un utilisateur</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom :</label>
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Entrez le nom"
                        required
                    />
                </div>
                <div>
                    <label>Prénom :</label>
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="Entrez le prénom"
                        required
                    />
                </div>
                <div>
                    <label>Email :</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Entrez l'email"
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe :</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Entrez un mot de passe"
                        required
                    />
                </div>
                <div>
                    <label>Rôle :</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Choisir un rôle</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>
                <div className="modal-actions">
                    <button type="button" onClick={onClose}>
                        Annuler
                    </button>
                    <button type="submit">
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormCreateUser;