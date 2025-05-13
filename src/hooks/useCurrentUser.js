import { useState, useEffect } from "react";
import { getUser } from "services/auth/authService";

const useCurrentUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const fetchedUser = await getUser(token);
                setUser(fetchedUser);
            } catch (err) {
                setError(err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error };
};

export default useCurrentUser;