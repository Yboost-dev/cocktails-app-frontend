import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getUser } from "services/auth/authService";

const PrivateRoute = () => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchUser = async () => {
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const userData = await getUser(token);
                setUser(userData);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur :", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Pendant le chargement, affiche un état de chargement temporaire
    if (loading) {
        return <div>Chargement...</div>;
    }

    // Vérifie si l'utilisateur est valide (et non une erreur)
    const isAuthenticated = user && !user.error;

    // Redirection selon le statut de l'utilisateur
    return isAuthenticated ? <Outlet /> : <Navigate to="/oups" />;
};

export default PrivateRoute;