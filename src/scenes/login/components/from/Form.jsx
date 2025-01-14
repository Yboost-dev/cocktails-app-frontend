import React from "react";
import Input from "./components/inputs/Input";

const Form = () => {
    return (
        <form>
            <Input
                type="email"
                name="email"
                placeholder="Email"
            />
            <Input
                type="password"
                name="password"
                placeholder="Mot de passe"
            />
        </form>
    );
};
export default Form;