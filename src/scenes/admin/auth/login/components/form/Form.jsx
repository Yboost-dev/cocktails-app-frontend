import React, { useState } from "react";
import './Form.scss';

import Input from 'components/form/input/Input';
import Button from "components/form/button/Button";
import { login } from "services/auth/authService";

const Form = ({ onSuccess, onError }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await login(email, password);
            onSuccess(data);
        } catch (error) {
            onError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit} method="POST" className="login-form">
                <Input
                    type="email"
                    placeholder="Email"
                    htmlFor="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    htmlFor="password"
                    label="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button value="Se connecter" disable={loading} />
            </form>
        </div>
    )
};

export default Form;