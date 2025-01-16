import React from "react";
import './Input.scss';

const Input = ({ type, placeholder, htmlFor, label, onChange, value, onFocus }) => {
    return (
        <div className="form-group">
            <input
                type={type}
                id={htmlFor}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                onFocus={onFocus}
            />
            <label htmlFor={htmlFor}>{label}</label>
        </div>
    );
};

export default Input;