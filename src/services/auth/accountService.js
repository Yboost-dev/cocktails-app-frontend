/** URL de base de l'API, récupérée depuis les variables d'environnement */
const API_BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Récupère tous les utilisateurs depuis l'API
 * @async
 * @function getAllUsers
 * @description Cette fonction récupère la liste de tous les utilisateurs du système.
 * Elle nécessite un token d'authentification valide pour accéder aux données.
 * @returns {Promise<Array>} Une promesse qui résout vers un tableau de tous les utilisateurs
 * @throws {Error} Lance une erreur si la requête échoue ou si l'utilisateur n'est pas autorisé
 */
export const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
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