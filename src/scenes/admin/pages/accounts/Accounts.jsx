import React from "react";
import NavBar from "../components/navBar/NavBar";
import Header from "../components/header/Header";
import Tableau from "./components/tableau/Tableau";


const Accounts = () => {
    return (
        <div className="dashboard-global">
            <NavBar/>
            <div className="dashboard-content">
                <Header/>
                <div className="dashboard-content-body">
                    <h1>Comptes</h1>
                    <div>
                        <Tableau/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accounts;