/** URL de base de l'API, récupérée depuis les variables d'environnement */
const API_BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Récupère toutes les commandes depuis l'API
 * @async
 * @function getAllOrders
 * @returns {Promise<Array>} Une promesse qui résout vers un tableau de toutes les commandes
 * @throws {Error} Lance une erreur si la requête échoue
 */
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

/**
 * Récupère les commandes les plus récentes
 * @async
 * @function getRecentOrders
 * @param {number} [limit=3] - Nombre maximum de commandes à récupérer
 * @returns {Promise<Array>} Une promesse qui résout vers un tableau des commandes récentes, triées par date et limitées au nombre spécifié
 * @throws {Error} Lance une erreur si la récupération échoue
 */
export const getRecentOrders = async (limit = 3) => {
    try {
        const allOrders = await getAllOrders();

        const ordersWithTotal = allOrders.map(order => {
            if (!order.total && order.articles && order.articles.length > 0) {
                const total = order.articles.reduce((sum, article) => {
                    return sum + (article.articlePrice * article.quantity);
                }, 0);

                return { ...order, total };
            }

            return order;
        });

        const sortedOrders = ordersWithTotal.sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        return sortedOrders.slice(0, limit);
    } catch (error) {
        throw error;
    }
};

/**
 * Crée une nouvelle commande
 * @async
 * @function createOrder
 * @param {Object} order - L'objet commande à créer
 * @param {string} order.email - Email du client
 * @param {string} order.phone - Numéro de téléphone du client
 * @param {number} order.table - Numéro de table
 * @param {string} order.token - Token de paiement
 * @param {string} order.status - Statut de la commande (ex: "pending")
 * @param {boolean} order.paid - État du paiement
 * @param {Array<Object>} order.articles - Articles commandés
 * @returns {Promise<Object>} Une promesse qui résout vers la commande créée
 * @throws {Error} Lance une erreur si la création échoue
 */
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

/**
 * Met à jour le statut d'une commande
 * @async
 * @function updateOrderStatus
 * @param {string|number} orderId - Identifiant de la commande à mettre à jour
 * @param {string} newStatus - Nouveau statut de la commande
 * @returns {Promise<Object>} Une promesse qui résout vers la commande mise à jour
 * @throws {Error} Lance une erreur si la mise à jour échoue
 */
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

/**
 * Met à jour le statut de paiement d'une commande
 * @async
 * @function updatePaymentStatus
 * @param {string|number} orderId - Identifiant de la commande à mettre à jour
 * @param {boolean} isPaid - Indique si la commande est payée
 * @returns {Promise<Object>} Une promesse qui résout vers la commande mise à jour
 * @throws {Error} Lance une erreur si la mise à jour échoue
 */
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

/**
 * Calcule le chiffre d'affaires du jour courant
 * @async
 * @function getDailyRevenue
 * @returns {Promise<number>} Une promesse qui résout vers le chiffre d'affaires du jour en euros
 * @throws {Error} Lance une erreur si le calcul échoue
 */

export const getDailyRevenue = async () => {
    try {
        const allOrders = await getAllOrders();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayOrders = allOrders.filter(order => {
            if (!order.createdAt) return false;

            const orderDate = new Date(order.createdAt);
            orderDate.setHours(0, 0, 0, 0);

            return orderDate.getTime() === today.getTime();
        });

        const dailyRevenue = todayOrders.reduce((total, order) => {
            if (order.status === "canceled") return total;

            if (order.total) {
                return total + order.total;
            }

            if (order.articles && order.articles.length > 0) {
                const orderTotal = order.articles.reduce((sum, article) => {
                    return sum + (article.articlePrice * article.quantity);
                }, 0);
                return total + orderTotal;
            }

            return total;
        }, 0);


        return dailyRevenue;
    } catch (error) {
        throw error;
    }
}

/**
 * Calcule le chiffre d'affaires de la semaine en cours (du lundi au jour actuel)
 * @async
 * @function getWeeklyRevenue
 * @returns {Promise<number>} Une promesse qui résout vers le chiffre d'affaires hebdomadaire en euros
 * @throws {Error} Lance une erreur si le calcul échoue
 */
export const getWeeklyRevenue = async () => {
    try {
        const allOrders = await getAllOrders();

        const today = new Date();
        const dayOfWeek = today.getDay();
        const firstDayOfWeek = new Date(today);

        const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        firstDayOfWeek.setDate(today.getDate() - daysToSubtract);
        firstDayOfWeek.setHours(0, 0, 0, 0);

        const weeklyOrders = allOrders.filter(order => {
            if (!order.createdAt) return false;

            const orderDate = new Date(order.createdAt);

            return orderDate >= firstDayOfWeek;
        });

        const weeklyRevenue = weeklyOrders.reduce((total, order) => {
            if (order.status === "canceled") return total;

            if (order.total) {
                return total + order.total;
            }

            if (order.articles && order.articles.length > 0) {
                const orderTotal = order.articles.reduce((sum, article) => {
                    return sum + (article.articlePrice * article.quantity);
                }, 0);
                return total + orderTotal;
            }

            return total;
        }, 0);

        return weeklyRevenue;
    } catch (error) {
        throw error;
    }
}

/**
 * Compte le nombre de commandes actives pour la semaine en cours
 * @async
 * @function getOrdersWeekly
 * @returns {Promise<number>} Une promesse qui résout vers le nombre de commandes actives de la semaine
 * @throws {Error} Lance une erreur si le calcul échoue
 */
export const getOrdersWeekly = async () => {
    try {
        const allOrders = await getAllOrders();

        // Obtenir la date du début de la semaine (lundi)
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 pour dimanche, 1 pour lundi, etc.
        const firstDayOfWeek = new Date(today);

        // Ajuster pour obtenir le lundi de la semaine en cours
        const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        firstDayOfWeek.setDate(today.getDate() - daysToSubtract);
        firstDayOfWeek.setHours(0, 0, 0, 0);

        // Filtrer les commandes de la semaine
        const weeklyOrders = allOrders.filter(order => {
            // Vérifier si la commande a une date
            if (!order.createdAt) return false;

            // Convertir la date de la commande
            const orderDate = new Date(order.createdAt);

            // Comparer les dates (la date de commande doit être après le début de la semaine)
            return orderDate >= firstDayOfWeek;
        });

        // Filtrer les commandes annulées
        const activeWeeklyOrders = weeklyOrders.filter(order => order.status !== "canceled");

        // Retourner le nombre de commandes actives de la semaine
        return activeWeeklyOrders.length;
    } catch (error) {
        console.error("Erreur lors du calcul du nombre de commandes hebdomadaires:", error);
        throw error;
    }
}