
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
        console.log(response.json());
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
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
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