import React from "react";
import "./Login.css";
import Form from "./components/from/Form";

function Login() {
    return (
        <section className="login-container">
            <div className="login-content">
                <h1>Connexion</h1>
                <Form/>
            </div>
        </section>
    );
};

export default Login;