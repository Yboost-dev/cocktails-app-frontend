import React from "react";
import './Button.scss';

const Button = ({value, disable}) => {
    return (
        <div className="btn-form-container">
            <button
                type="submit"
                className={`btn-form ${disable ? "disabled" : ""}`}
                disabled={disable}
            >
                <span>{value}</span>
            </button>
        </div>
    );
};

export default Button;