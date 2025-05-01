const API_BASE_URL = process.env.REACT_APP_API_URL;

// Cette fonction existe déjà dans votre code
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
        console.error(error);
        throw error;
    }
}

// Fonction pour récupérer une catégorie par son ID
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
        console.log("Catégorie récupérée:", data);
        return data;
    } catch (error) {
        console.error("Erreur dans getCategoryById:", error);
        throw error;
    }
}

// Fonction pour créer une catégorie
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
        console.error("Erreur lors de la création de la catégorie:", error);
        throw error;
    }
}

// Fonction pour mettre à jour une catégorie
export const updateCategory = async (categoryData) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_BASE_URL}/category/${categoryData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name: categoryData.name })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erreur lors de la mise à jour de la catégorie");
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la catégorie:", error);
        throw error;
    }
}

// Fonction pour supprimer une catégorie
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
        console.error("Erreur lors de la suppression de la catégorie:", error);
        throw error;
    }
}