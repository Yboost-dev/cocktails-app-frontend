import React from "react";
import './Form.scss'

import Input from 'components/form/input/Input'
import Button from "components/form/button/Button"


const Form = () => {
    return (
        <div className="login-form-container">
            <form action="" method="POST" className="login-form">
                <Input type="email" placeholder="Email" htmlFor="email" label={'Email'}/>
                <Input type="password" placeholder="Password" htmlFor="password" label={'Mot de passe'}/>
                <Button value="Se connecter" disable={true}/>
            </form>
        </div>
    )
}

export default Form