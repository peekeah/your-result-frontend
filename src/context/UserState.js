import React, {useState} from "react";
import UserContext from "./UserContext";

export const UserState = (props) => {
    // getting auth status using token
    const [auth, setAuth] = useState( localStorage.getItem("token") ? true : false);

    // function to toggle auth
    const toggleAuth = () => {
        if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        }
        setAuth(!auth);
    };

    return (
        <UserContext.Provider value={{ auth, toggleAuth }}>
            {props.children}
        </UserContext.Provider>
    );
};
