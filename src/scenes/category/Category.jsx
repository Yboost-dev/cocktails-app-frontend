import Header from "../../components/header/Header";
import {useEffect, useState} from "react";
import {getCategory} from "../../services/articles/articlesService";
import {useParams} from "react-router-dom";


const Category = () => {
    const [categories, setCategory] = useState([]);

    const categoryUrl = useParams()
    useEffect(() => {
        getCategory({categoryUrl})
            .then((data) => {
                setCategory(data)
                console.log(setCategory(data))
            })
            .catch((error) => {
                console.error("Une erreur est survenue :", error);
            });
        },[]);


    return (
        <div>
            <Header/>
            {/*{categories.map((category))}*/}
        </div>
    );
};

export default Category