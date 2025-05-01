import React from 'react';
import './popupDelete.scss';

const PopupDelete = ({ onClose, onConfirm }) => {
    return (
        <div className="delete-confirmation">
            <h3>Confirmer la suppression</h3>
            <p>
                Êtes-vous sûr de vouloir supprimer cet ingrédient ? Cette action est irréversible.
            </p>
            <div className="confirmation-actions">
                <button type="button" className="cancel-button" onClick={onClose}>
                    Annuler
                </button>
                <button type="button" className="delete-button" onClick={onConfirm}>
                    Supprimer
                </button>
            </div>
        </div>
    );
};

export default PopupDelete;