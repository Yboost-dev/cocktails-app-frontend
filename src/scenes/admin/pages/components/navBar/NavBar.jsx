import React from 'react';
import './NavBar.scss';
import Button from './components/buttons/Button'


import useCurrentUser from "hooks/useCurrentUser";


const NavBar = () => {
    const {user, loading, error} = useCurrentUser();

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur : {error.message || "Impossible de charger les données utilisateur."}</div>;
    }

    if (!user) {
        return <div>Utilisateur non connecté.</div>;
    }

    return (
        <nav className="nav-bar">
            <div className="nav-bar-logo">
                <img src="/img/logo.png" alt=""/>
            </div>
            <div className="nav-bar-options">
                <Button text="Dashboard" link="/admin/dashboard"/>
                <Button text="Commandes" link="/admin/orders"/>
                <Button text="Articles" link="/admin/articles"/>
                <Button text="Categories" link="/admin/category"/>
                <Button text="Ingredients" link="/admin/ingredients"/>
                <Button text="Comptes" link="/admin/accounts"/>
            </div>
        </nav>
    );
};

export default NavBar;