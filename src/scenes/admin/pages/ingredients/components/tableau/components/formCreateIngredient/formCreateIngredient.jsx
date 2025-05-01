import React, { useState } from 'react';
import { X } from 'lucide-react';
import './formCreateIngredient.scss';

const FormCreateIngredient = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: 0,
        unit: 'g',
    });

    const [errors, setErrors] = useState({
        name: '',
        quantity: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'quantity') {
            const intValue = parseInt(value, 10);
            setFormData({
                ...formData,
                [name]: isNaN(intValue) ? 0 : intValue,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }

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
            return;
        }

        onSave(formData);
        onClose();
    };

    return (
        <div className="ingredient-modal">
            <div className="ingredient-modal-header">
                <h2>Ajouter un ingrédient</h2>
                <button className="close-button" onClick={onClose}>
                    <X size={24} />
                </button>
            </div>

            <div className="ingredient-modal-content">
                <form className="ingredient-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nom de l'ingrédient</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Entrez le nom de l'ingrédient"
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity">Quantité</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="Entrez la quantité"
                        />
                        {errors.quantity && <span className="error">{errors.quantity}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="unit">Unité</label>
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

                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Annuler
                        </button>
                        <button type="submit" className="save-button">
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormCreateIngredient;