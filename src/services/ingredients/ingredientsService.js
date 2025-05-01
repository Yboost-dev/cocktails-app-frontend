const API_BASE_URL = process.env.REACT_APP_API_URL;

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
        console.error(error);
        throw error;
    }
}

export const getIngredientById = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_BASE_URL}/ingredients/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

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
        console.error(error);
        throw error;
    }
}