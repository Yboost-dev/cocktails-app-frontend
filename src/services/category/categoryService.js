/** URL de base de l'API, récupérée depuis les variables d'environnement */
const API_BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Récupère toutes les catégories depuis l'API
 * @async
 * @function getAllCategory
 * @returns {Promise<Array>} Une promesse qui résout vers un tableau de toutes les catégories
 * @throws {Error} Lance une erreur si la requête échoue
 */
export const getAllCategory = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_BASE_URL}/category`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        return await response.json();
    } catch (error) {
        throw error;
    }
}

/**
 * Récupère une catégorie spécifique par son identifiant
 * @async
 * @function getCategoryById
 * @param {string|number} id - Identifiant unique de la catégorie à récupérer
 * @returns {Promise<Object>} Une promesse qui résout vers l'objet catégorie correspondant
 * @throws {Error} Lance une erreur si la catégorie n'existe pas ou si la requête échoue
 */
export const getCategoryById = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_BASE_URL}/category/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

/**
 * Crée une nouvelle catégorie
 * @async
 * @function createCategory
 * @param {Object} categoryData - Données de la catégorie à créer
 * @param {string} categoryData.name - Nom de la catégorie
 * @param {string} [categoryData.description] - Description de la catégorie (optionnel)
 * @param {string} [categoryData.image] - URL de l'image de la catégorie (optionnel)
 * @returns {Promise<Object>} Une promesse qui résout vers la catégorie créée
 * @throws {Error} Lance une erreur si la création échoue
 */
export const createCategory = async (categoryData) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_BASE_URL}/category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(categoryData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erreur lors de la création de la catégorie");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

/**
 * Met à jour une catégorie existante
 * @async
 * @function updateCategory
 * @param {Object} categoryData - Données de la catégorie à mettre à jour
 * @param {string|number} categoryData.id - Identifiant unique de la catégorie
 * @param {string} [categoryData.name] - Nouveau nom de la catégorie (optionnel)
 * @param {string} [categoryData.description] - Nouvelle description (optionnel)
 * @param {string} [categoryData.image] - Nouvelle URL d'image (optionnel)
 * @returns {Promise<Object>} Une promesse qui résout vers la catégorie mise à jour
 * @throws {Error} Lance une erreur si la mise à jour échoue
 */
export const updateCategory = async (categoryData) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_BASE_URL}/category/${categoryData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ id: categoryData.id })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erreur lors de la mise à jour de la catégorie");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}


/**
 * Supprime une catégorie par son identifiant
 * @async
 * @function deleteCategory
 * @param {string|number} id - Identifiant unique de la catégorie à supprimer
 * @returns {Promise<Object>} Une promesse qui résout vers un objet de confirmation
 * @throws {Error} Lance une erreur si la suppression échoue
 */
export const deleteCategory = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_BASE_URL}/category/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erreur lors de la suppression de la catégorie");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}