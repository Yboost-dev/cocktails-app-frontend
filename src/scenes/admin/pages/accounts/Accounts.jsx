import React, {useState, useEffect} from "react";
import NavBar from "../components/navBar/NavBar";
import { getAllUsers } from "services/auth/accountService";

const Accounts = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers()
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error("Une erreur est survenue, oupsi.. :", error)
            })
    }, []) 

    return (
        <div className="dashboard-global">
            <NavBar/>
            <p>Comptes</p>
            {users.map((user) => (
                <div>
                    <p>{user.id}</p>
                    <p>{user.firstname}</p>
                    <p>{user.lastname}</p>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                </div>
            ))}
        </div>
    );
};

export default Accounts;