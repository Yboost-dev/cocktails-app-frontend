import React from 'react';
import {Link} from 'react-router-dom';

const Card = ({id, title, description, price, imagePath}) => {
    return(
        <Link to = {`/article/${id}`}>
    <div key = {id}>
        <h1>{id}</h1>
        <div>{title}</div>
        <div>{description}</div>
        <div>{price}</div>
        <div>{imagePath}</div>
    </div>
        </Link>
    )
}

export default Card;