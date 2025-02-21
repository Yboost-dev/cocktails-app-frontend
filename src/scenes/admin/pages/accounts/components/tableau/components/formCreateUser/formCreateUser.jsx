import React, { useEffect, useState } from 'react';
import './formCreateUser.scss'; // Importation de votre SCSS

const FormCreateUser = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        lastname: '',
        firstname: '',
        email: '',
        password: '',
        role: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        role: '',
    });
    const [passwordValidation, setPasswordValidation] = useState({
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialCharacter: false,
        minLength: false,
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validatePassword = (value) => {
        const newPasswordValidation = {
            hasUppercase: /[A-Z]/.test(value),
            hasLowercase: /[a-z]/.test(value),
            hasNumber: /\d/.test(value),
            hasSpecialCharacter: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
            minLength: value.length >= 8,
        };

        setPasswordValidation(newPasswordValidation);
        return Object.values(newPasswordValidation).every((isValid) => isValid);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'email') {
            if (!emailRegex.test(value)) {
                setErrors((prev) => ({ ...prev, email: 'Email non valide.' }));
            } else {
                setErrors((prev) => ({ ...prev, email: '' }));
            }
        }

        if (name === 'password') {
            const isPasswordValid = validatePassword(value);
            if (!isPasswordValid) {
                setErrors((prev) => ({
                    ...prev,
                    password: 'Le mot de passe ne respecte pas tous les critères.',
                }));
            } else {
                setErrors((prev) => ({ ...prev, password: '' }));
            }
        }

        if (name === 'role') {
            if (value !== 'admin' && value !== 'employee') {
                setErrors((prev) => ({
                    ...prev,
                    role: 'Le rôle doit être "admin" ou "employee".',
                }));
            } else {
                setErrors((prev) => ({ ...prev, role: '' }));
            }
        }
    };

    useEffect(() => {
        const emailValid = formData.email && !errors.email;
        const passwordValid = formData.password && Object.values(passwordValidation).every(Boolean);
        const roleValid = formData.role && !errors.role;
        const nameValid = formData.lastname && formData.firstname;

        setIsFormValid(emailValid && passwordValid && roleValid && nameValid);
    }, [formData, errors, passwordValidation]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isFormValid) {
            alert('Le formulaire est invalide. Corrigez les erreurs.');
            return;
        }

        onSave(formData);
        onClose();
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
                    {errors.email && <small className="error">{errors.email}</small>}
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
                    {errors.password && <small className="error">{errors.password}</small>}
                    <ul className="password-validation">
                        <li className={passwordValidation.minLength ? 'valid' : 'invalid'}>
                            Au moins 8 caractères
                        </li>
                        <li className={passwordValidation.hasUppercase ? 'valid' : 'invalid'}>
                            Une majuscule
                        </li>
                        <li className={passwordValidation.hasLowercase ? 'valid' : 'invalid'}>
                            Une minuscule
                        </li>
                        <li className={passwordValidation.hasNumber ? 'valid' : 'invalid'}>
                            Un chiffre
                        </li>
                        <li className={passwordValidation.hasSpecialCharacter ? 'valid' : 'invalid'}>
                            Un caractère spécial
                        </li>
                    </ul>
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
                    {errors.role && <small className="error">{errors.role}</small>}
                </div>
                <div className="modal-actions">
                    <button type="button" onClick={onClose}>
                        Annuler
                    </button>
                    <button type="submit" disabled={!isFormValid}>
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormCreateUser;