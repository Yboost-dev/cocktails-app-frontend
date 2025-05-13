/** URL de base de l'API, récupérée depuis les variables d'environnement */
const API_BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Récupère tous les ingrédients depuis l'API
 * @async
 * @function getAllIngredients
 * @returns {Promise<Array>} Une promesse qui résout vers un tableau de tous les ingrédients
 * @throws {Error} Lance une erreur si la requête échoue
 */
export const getAllIngredients = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_BASE_URL}/ingredients`, {
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
 * Crée un nouvel ingrédient
 * @async
 * @function createIngredient
 * @param {Object} ingredient - L'objet ingrédient à créer
 * @param {string} ingredient.name - Nom de l'ingrédient
 * @param {string} [ingredient.description] - Description de l'ingrédient (optionnel)
 * @param {number} [ingredient.stock] - Quantité en stock (optionnel)
 * @param {string} [ingredient.unit] - Unité de mesure (ex: "cl", "g") (optionnel)
 * @returns {Promise<Object>} Une promesse qui résout vers l'ingrédient créé
 * @throws {Error} Lance une erreur si la création échoue
 */
export const createIngredient = async (ingredient) => {
    const token = localStorage.getItem("token");
    console.log(ingredient);
    try {
        const response = await fetch(`${API_BASE_URL}/ingredients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(ingredient)
        })
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Supprime un ingrédient par son identifiant
 * @async
 * @function deleteIngredient
 * @param {string|number} id - Identifiant unique de l'ingrédient à supprimer
 * @returns {Promise<Object>} Une promesse qui résout vers un objet de confirmation de suppression
 * @throws {Error} Lance une erreur si la suppression échoue ou si l'ingrédient n'existe pas
 * @example
 */
export const deleteIngredient = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_BASE_URL}/ingredients/${id}`, {
            method: "DELETE",
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