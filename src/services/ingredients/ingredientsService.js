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