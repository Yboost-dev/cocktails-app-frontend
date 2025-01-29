import React, { useState } from "react";
import './Login.scss';

import Form from './components/form/Form';
import Errors from "components/errors/errorsMessage/ErrorsMessage";

const Login = () => {
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    const handleSuccess = (data) => {
        setUser(data);
        setError('');

        window.location.href = "/admin/dashboard";
    };

    const handleError = (errorMessage) => {
        setError(errorMessage);
    };

    return (
        <section className="login">
            <div className="login-container">
                <div className="login-title">
                    <h1>Connexion</h1>
                </div>

                {/* Affiche les erreurs */}
                <div className="login-error">
                    {error && <Errors message={error} />}
                </div>

                {/* Formulaire */}
                <div className="login-form-container">
                    <Form onSuccess={handleSuccess} onError={handleError} />
                </div>
            </div>
        </section>
    );
};

export default Login;