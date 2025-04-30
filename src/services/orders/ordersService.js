// src/services/orders/ordersService.js

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getAllOrders = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createOrder = async (order) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(order)
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Utilise la route principale pour mettre à jour une commande
export const updateOrderStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Erreur HTTP ${response.status}:`, errorText);
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Erreur lors de la mise à jour du statut de la commande ${orderId}:`, error);
        throw error;
    }
};

// Utilise la route principale pour mettre à jour le paiement
export const updatePaymentStatus = async (orderId, isPaid) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ paid: isPaid }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Erreur HTTP ${response.status}:`, errorText);
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Erreur lors de la mise à jour du statut de paiement de la commande ${orderId}:`, error);
        throw error;
    }
};