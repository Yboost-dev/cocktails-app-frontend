/** URL de base de l'API, récupérée depuis les variables d'environnement */
const API_BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Récupère tous les articles depuis l'API
 * @async
 * @function getAllArticles
 * @returns {Promise<Array>} Une promesse qui résout vers un tableau de tous les articles
 * @throws {Error} Lance une erreur si la requête échoue
 */
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
        throw error;
    }
}

/**
 * Récupère un article spécifique par son ID
 * @async
 * @function getArticleById
 * @param {string|number} id - Identifiant unique de l'article à récupérer
 * @returns {Promise<Object>} Une promesse qui résout vers l'objet article
 * @throws {Error} Lance une erreur si l'article n'existe pas ou si la requête échoue
 */
export const getArticleById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }
        const data = await response.json();
        console.log("Article récupéré (brut):", data);

        // Si c'est un tableau, retourner le premier élément, sinon retourner les données telles quelles
        const formattedData = Array.isArray(data) ? data[0] : data;
        console.log("Article formaté:", formattedData);

        return formattedData;
    } catch (error) {
        console.error("Erreur dans getArticleById:", error);
        throw error;
    }
}


/**
 * Récupère une catégorie par son nom
 * @async
 * @function getCategory
 * @param {string} category - Nom de la catégorie à récupérer
 * @returns {Promise<Object>} Une promesse qui résout vers l'objet catégorie
 * @throws {Error} Lance une erreur si la catégorie n'existe pas ou si la requête échoue
 */
export const getCategory = async (category) => {
    try {
        const response = await fetch(`${API_BASE_URL}/category/name/${category}`, {
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

/**
 * Crée un nouvel article avec ses ingrédients et une image
 * @async
 * @function createArticle
 * @param {Object} articleData - Données de l'article à créer
 * @param {string} articleData.title - Titre de l'article
 * @param {string} articleData.description - Description de l'article
 * @param {number} articleData.price - Prix de l'article
 * @param {number} articleData.categoryId - ID de la catégorie de l'article
 * @param {boolean} articleData.published - Statut de publication de l'article
 * @param {Array<Object>} articleData.ingredients - Liste des ingrédients avec leurs quantités
 * @param {number} articleData.ingredients[].ingredientId - ID de l'ingrédient
 * @param {number} articleData.ingredients[].quantity - Quantité de l'ingrédient
 * @param {File} file - Fichier image de l'article
 * @returns {Promise<Object>} Une promesse qui résout vers l'article créé
 * @throws {Error} Lance une erreur si la création échoue
 */
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

/**
 * Met à jour un article existant
 * @async
 * @function updateArticle
 * @param {Object} articleData - Données de l'article à mettre à jour
 * @param {number} articleData.id - ID de l'article à mettre à jour
 * @param {string} articleData.title - Nouveau titre de l'article
 * @param {string} articleData.description - Nouvelle description
 * @param {number} articleData.price - Nouveau prix
 * @param {number} articleData.categoryId - Nouvelle catégorie
 * @param {boolean} articleData.published - Nouveau statut de publication
 * @param {Array<Object>} articleData.ingredients - Nouveaux ingrédients avec quantités
 * @param {File} file - Nouvelle image de l'article (ou null pour conserver l'existante)
 * @returns {Promise<Object>} Une promesse qui résout vers l'article mis à jour
 * @throws {Error} Lance une erreur si la mise à jour échoue
 */
export const updateArticle = async (articleData, file) => {
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
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/articles/${articleData.id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Supprime un article par son identifiant
 * @async
 * @function deleteArticle
 * @param {string|number} id - Identifiant unique de l'article à supprimer
 * @returns {Promise<Object>} Une promesse qui résout vers un objet de confirmation
 * @throws {Error} Lance une erreur si la suppression échoue
 */
export const deleteArticle = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
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