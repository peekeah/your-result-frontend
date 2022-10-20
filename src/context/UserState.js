import React, {useEffect, useState} from "react";
import UserContext from "./UserContext";
import axios from "axios";
export const UserState = (props) => {
    // getting auth status using token
    const [auth, setAuth] = useState( localStorage.getItem("token") ? true : false);
    const [studentList, setStudentList] = useState([]);

    // function to toggle auth
    const toggleAuth = () => {
        if (auth) {
            localStorage.removeItem("token");
        }
        setAuth(!auth);
    };

    // function to get Students list
    const getStudentList = async() => {
        try {
            const URL = process.env.REACT_APP_BACKEND_API;
            const token = JSON.parse(localStorage.getItem("token")) || "";
            const res = await axios.get(`${URL}/result/display-entries`, {
                headers: {
                    "access-token": token,
                },
            });
            // setData(res.data);
            if (res.data) {
                setStudentList(res.data);
            } else {
                toggleAuth();
                localStorage.removeItem("token");
            }
        } catch (error) {
            toggleAuth();
            console.log(error);
            localStorage.removeItem("token");
        }
    }

    const logoutUser = () => {
        setAuth(false);
        const token = localStorage.getItem("token");
        if(token) {
            localStorage.removeItem("token");
        }
    }



    return (
        <UserContext.Provider value={{ auth, toggleAuth, studentList, getStudentList }}>
            {props.children}
        </UserContext.Provider>
    );
};
