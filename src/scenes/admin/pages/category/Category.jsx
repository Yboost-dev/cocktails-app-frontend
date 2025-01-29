import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import { getAllCategory } from "services/category/categoryService";

const Category = () => {

    const [categories, setCategory] = useState([]);

    useEffect(() => {
        getAllCategory()
            .then((data) => {
                setCategory(data);
            })
            .catch((error) => {
                console.error("Une erreur est survenue :", error);
            });
    }, []);

    return (
        <div className="dashboard-global">
            <NavBar/>
            <p>Catégories</p>
            {categories.map((category) => (
                <div key={category.id}>
                    <p>{category.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Category;