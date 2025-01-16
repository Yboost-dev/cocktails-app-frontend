import React, { useState, useEffect } from "react";
import './Form.scss';

import Input from 'components/form/input/Input';
import Button from "components/form/button/Button";

const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [passwordValidation, setPasswordValidation] = useState({
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialCharacter: false,
        minLength: false,
    });
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false); // Correctement initialisé

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Critères de validation du mot de passe
    const validatePassword = (value) => {
        const newPasswordValidation = {
            hasUppercase: /[A-Z]/.test(value),
            hasLowercase: /[a-z]/.test(value),
            hasNumber: /\d/.test(value),
            hasSpecialCharacter: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
            minLength: value.length >= 8,
        };

        setPasswordValidation(newPasswordValidation);

        return Object.values(newPasswordValidation).every((isValid) => isValid);
    };

    // Gestion du champ email
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (!emailRegex.test(value)) {
            setErrors((prev) => ({ ...prev, email: 'Email non valide' }));
        } else {
            setErrors((prev) => ({ ...prev, email: '' }));
        }
    };

    // Gestion du mot de passe
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        const isPasswordValid = validatePassword(value);

        if (!isPasswordValid) {
            setErrors((prev) => ({
                ...prev,
                password: 'Le mot de passe ne respecte pas toutes les conditions.',
            }));
        } else {
            setErrors((prev) => ({ ...prev, password: '' }));
        }
    };

    useEffect(() => {
        const emailValid = email && !errors.email;
        const passwordValid = password && Object.values(passwordValidation).every((isValid) => isValid);

        setIsFormValid(emailValid && passwordValid);
    }, [email, password, errors, passwordValidation]);

    return (
        <div className="register-form-container">
            <form
                action=""
                method="POST"
                className="register-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (isFormValid) {
                        console.log('Formulaire envoyé', { email, password });
                    } else {
                        console.log('Le formulaire contient des erreurs');
                    }
                }}
            >
                {/* Champ email */}
                <Input
                    type="email"
                    placeholder="Email"
                    htmlFor="email"
                    label="Email"
                    onChange={handleEmailChange}
                    value={email}
                />
                {errors.email && <p className="error">{errors.email}</p>}

                {/* Champ mot de passe */}
                <Input
                    type="password"
                    placeholder="Password"
                    htmlFor="password"
                    label="Mot de passe"
                    onChange={handlePasswordChange}
                    value={password}
                    onFocus={() => setIsPasswordFocused(true)}
                />

                {/* Validators mot de passe */}
                {isPasswordFocused && (
                    <div className="password-validation">
                        <ul>
                            <li className={passwordValidation.hasUppercase ? 'valid' : 'invalid'}>
                                Une majuscule
                            </li>
                            <li className={passwordValidation.hasLowercase ? 'valid' : 'invalid'}>
                                Une minuscule
                            </li>
                            <li className={passwordValidation.hasSpecialCharacter ? 'valid' : 'invalid'}>
                                Un caractère spécial
                            </li>
                            <li className={passwordValidation.hasNumber ? 'valid' : 'invalid'}>
                                Un chiffre
                            </li>
                            <li className={passwordValidation.minLength ? 'valid' : 'invalid'}>
                                Minimum 8 caractères
                            </li>
                        </ul>
                    </div>
                )}

                {/* Bouton Inscrire */}
                <Button value="Inscrire" disable={!isFormValid} />
            </form>
        </div>
    );
};

export default Form;