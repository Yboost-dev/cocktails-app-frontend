// Fonction pour se connecter (login)

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
    try {
        console.log(email, password);
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
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
        console.error(error);
        throw error;
    }
};

// Fonction pour récupérer l'utilisateur connecté
export const getUser = async (token) => {
    if (!token) {
        return { error: "Utilisateur non connecté." };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return { error: "Impossible de récupérer les informations de l'utilisateur." };
        }

        return await response.json(); // Retourne les données utilisateur si succès
    } catch (error) {
        console.error(error);
        return { error: "Une erreur s'est produite lors de la récupération de l'utilisateur." };
    }
};

// Fonction pour se déconnecter (logout)
export const logout = () => {
    localStorage.removeItem("token");
};