import React from "react";
import NavBar from "../components/navBar/NavBar";
import Header from "../components/header/Header";
import Tableau from "./components/tableau/Tableau";
import CreateArticleForm from "./components/fromCreateArticle/CreateArticleForm";

const AdminArticles = () => {
    return (
        <div className="dashboard-global">
            <NavBar />
            <div className="dashboard-content">
                <Header />
                <div className="dashboard-content-body">
                    <h1>Articles</h1>
                    <div>
                        <Tableau />
                    </div>
                    <div>
                        <CreateArticleForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminArticles;