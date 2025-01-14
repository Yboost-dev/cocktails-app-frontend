import React from 'react';
import './Input.css';

const Input = ({ type = "text", name = "", placeholder = "", value, onChange }) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="input-field"
        />
    );
};

export default Input;