/** URL de base de l'API, récupérée depuis les variables d'environnement */
const API_URL = process.env.REACT_APP_API_URL;

/**
 * Authentifie un utilisateur et récupère un token
 * @async
 * @function login
 * @param {string} email - Adresse email de l'utilisateur
 * @param {string} password - Mot de passe de l'utilisateur
 * @returns {Promise<Object>} Une promesse qui résout vers un objet contenant le token et les informations utilisateur
 * @throws {Error} Lance une erreur si l'authentification échoue
 */
export const login = async (email, password) => {
    try {
        console.log(email, password);
        console.log(API_URL)
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la connexion. Vérifiez vos identifiants.");
        }

        const data = await response.json();

        localStorage.setItem("token", data.accessToken);

        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Enregistre un nouvel utilisateur dans le système
 * @async
 * @function register
 * @param {Object} user - Données de l'utilisateur à créer
 * @param {string} user.email - Email de l'utilisateur
 * @param {string} user.password - Mot de passe de l'utilisateur
 * @param {string} [user.firstName] - Prénom de l'utilisateur (optionnel)
 * @param {string} [user.lastName] - Nom de famille de l'utilisateur (optionnel)
 * @param {string} [user.role] - Rôle de l'utilisateur (optionnel)
 * @returns {Promise<Object>} Une promesse qui résout vers l'objet utilisateur créé
 * @throws {Error} Lance une erreur si l'enregistrement échoue
 */
export const register = async (user) => {
    const token = isAuthenticated();
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Échec de la création de l'utilisateur.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Récupère les informations de l'utilisateur connecté
 * @async
 * @function getUser
 * @param {string} token - Token d'authentification
 * @returns {Promise<Object>} Une promesse qui résout vers les données de l'utilisateur ou un objet d'erreur
 */
export const getUser = async (token) => {
    if (!token) {
        return { error: "Utilisateur non connecté." };
    }

    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return { error: "Impossible de récupérer les informations de l'utilisateur." };
        }

        return await response.json();
    } catch (error) {
        return { error: "Une erreur s'est produite lors de la récupération de l'utilisateur." };
    }
};


/**
 * Supprime un utilisateur par son identifiant
 * @async
 * @function deleteUser
 * @param {string|number} id - Identifiant unique de l'utilisateur à supprimer
 * @returns {Promise<Object>} Une promesse qui résout vers un objet de confirmation
 * @throws {Error} Lance une erreur si la suppression échoue
 */
export const deleteUser = async (id) => {
    const token = isAuthenticated();
    try {
        await fetch(`${API_URL}/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
    } catch (error) {
        throw error;
    }
}

/**
 * Vérifie si un utilisateur est actuellement authentifié
 * @function isAuthenticated
 * @returns {string|null} Le token d'authentification s'il existe, sinon null
 * @example
 */
export const isAuthenticated = () => {
    return localStorage.getItem("token");
}

/**
 * Déconnecte l'utilisateur en supprimant son token d'authentification
 * @function logout
 */
export const logout = () => {
    localStorage.removeItem("token");
};