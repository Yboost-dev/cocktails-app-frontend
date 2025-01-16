import React from "react";
import './Login.scss'

import Form from './components/form/Form';
import Errors from "components/errors/errorsMessage/ErrorsMessage";

const Login = () => {
    return (
        <section className="login">
            <div className="login-container">
                <div className="login-title">
                    <h1>Connexion</h1>
                </div>
                <div className="login-error">
                    <Errors message='Errors' />
                </div>
                <div className="login-form-container">
                    <Form/>
                </div>
            </div>
        </section>
    )
}

export default Login;