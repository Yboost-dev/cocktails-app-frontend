import React from "react";
import './ErrorsMessage.scss'

const Errors = ({message}) => {
    return (
        <div className="errors">
            <span>{ message }</span>
        </div>
    )
}

export default Errors;