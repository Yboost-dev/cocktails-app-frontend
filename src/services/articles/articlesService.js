
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getAllArticles = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_BASE_URL}/articles`, {
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

export const getArticleById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        // Vérifiez le statut de la réponse avant de parser les données
        if (!response.ok) {
            const errorData = await response.json(); // Parse l'erreur renvoyée par le serveur
            throw new Error(JSON.stringify(errorData)); // Lancer une erreur avec les détails de la réponse
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCategory = async(category) => {
    try {
        const response = await fetch(`${API_BASE_URL}/category/${category}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}