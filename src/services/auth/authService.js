const API_URL = process.env.REACT_APP_API_URL;

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
        console.error(error);
        throw error;
    }
};

export const register = async (user) => {
    const token = isAuthenticated();
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(user), // Envoie les données utilisateur au serveur
        });

        if (!response.ok) {
            throw new Error("Échec de la création de l'utilisateur.");
        }

        const data = await response.json();
        return data; // Retourne les données de l'utilisateur créé
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        throw error; // Relance l'erreur pour une gestion dans le composant React
    }
};

// Fonction pour récupérer l'utilisateur connecté
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

        return await response.json(); // Retourne les données utilisateur si succès
    } catch (error) {
        console.error(error);
        return { error: "Une erreur s'est produite lors de la récupération de l'utilisateur." };
    }
};

export const deleteUser = async (id) => {
    const token = isAuthenticated();
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const isAuthenticated = () => {
    return localStorage.getItem("token");
}

// Fonction pour se déconnecter (logout)
export const logout = () => {
    localStorage.removeItem("token");
};