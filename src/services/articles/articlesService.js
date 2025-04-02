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

export const createArticle = async (articleData, file) => {
    const token = localStorage.getItem("token");

    try {
        const formData = new FormData();

        formData.append('imagePath', file);

        formData.append('title', articleData.title);
        formData.append('description', articleData.description);
        formData.append('price', articleData.price.toString());
        formData.append('categoryId', articleData.categoryId.toString());
        formData.append('published', articleData.published.toString());

        articleData.ingredients.forEach((ingredient, index) => {
            formData.append(`ingredients[${index}][ingredientId]`, ingredient.ingredientId.toString());
            formData.append(`ingredients[${index}][quantity]`, ingredient.quantity.toString());
        });

        console.log("FormData envoyé:",
            Array.from(formData.entries()).reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {})
        );

        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/articles`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erreur de création d'article:", errorData);
            throw new Error(errorData.message || "Erreur lors de la création de l'article");
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la création de l'article:", error);
        throw error;
    }
};

