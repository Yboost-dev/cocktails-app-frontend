import React from 'react';

const PopupDelete = ({ onClose, onConfirm }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Confirmation</h3>
                <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
                <div className="modal-actions">
                    <button onClick={onClose} className="btn-cancel">Annuler</button>
                    <button onClick={onConfirm} className="btn-confirm">Confirmer</button>
                </div>
            </div>
        </div>
    );
};

export default PopupDelete;