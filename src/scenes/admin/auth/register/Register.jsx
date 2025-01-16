import React from "react";
import './Register.scss'

import Form from './components/form/Form';
import Errors from "components/errors/errorsMessage/ErrorsMessage";

const Register = () => {
    return (
        <section className="register">
            <div className="register-container">
                <div className="register-title">
                    <h1>Inscription</h1>
                </div>
                <div className="register-error">
                    <Errors message='Errors' />
                </div>
                <div className="register-form-container">
                    <Form/>
                </div>
            </div>
        </section>
    )
}

export default Register;