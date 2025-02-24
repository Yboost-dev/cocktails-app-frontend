import React, { useState } from 'react';
import './formCreateIngredient.scss'

const FormCreateIngredient = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: 0, // Nombre entier par défaut
        unit: 'g', // Valeur par défaut pour "unit"
    });

    const [errors, setErrors] = useState({
        name: '',
        quantity: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'quantity') {
            const intValue = parseInt(value, 10); // Convertir la valeur en entier
            setFormData({
                ...formData,
                [name]: isNaN(intValue) ? 0 : intValue, // Par défaut, 0 si NaN
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }

        // Réinitialiser les erreurs si l'utilisateur modifie la saisie
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const isFormValid = () => {
        let valid = true;
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Le nom de l\'ingrédient est requis.';
            valid = false;
        }
        if (!formData.quantity || formData.quantity <= 0) {
            newErrors.quantity = 'La quantité doit être un entier positif.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            alert('Le formulaire est invalide. Corrigez les erreurs.');
            return;
        }

        onSave(formData); // Envoie les données
        onClose(); // Ferme le formulaire
    };

    return (
        <div className="ajouter-ingredient-form">
            <h2>Ajouter un ingrédient</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nom :</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Entrez le nom de l'ingrédient"
                        required
                    />
                    {errors.name && <small className="error">{errors.name}</small>}
                </div>
                <div>
                    <label htmlFor="quantity">Quantité :</label>
                    <input
                        type="number" // Permet une saisie directe de nombres
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Entrez la quantité"
                        required
                    />
                    {errors.quantity && <small className="error">{errors.quantity}</small>}
                </div>
                <div>
                    <label htmlFor="unit">Unité :</label>
                    <select
                        id="unit"
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                    >
                        <option value="g">gramme</option>
                        <option value="ml">millilitre</option>
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

export default FormCreateIngredient;