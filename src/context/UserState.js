import React, {useEffect, useState} from "react";
import UserContext from "./UserContext";
import axios from "axios";
export const UserState = (props) => {
    // getting auth status using token
    const URL = process.env.REACT_APP_BACKEND_API;
    const token = JSON.parse(localStorage.getItem("token")) || "";
    const config = {
        headers: {
            "access-token": token,
        },
    }
    const [auth, setAuth] = useState( localStorage.getItem("token") ? true : false);
    const [studentList, setStudentList] = useState([]);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
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
            const res = await axios.get(`${URL}/result/display-entries`, config);
            if (res.data) {
                setStudentList(res.data);
            } else {
                toggleAuth();
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.log(error);
            logoutUser();
        }
        getSubjects();
        getStudents();
    }


    const logoutUser = () => {
        setAuth(false);
        const existToken = localStorage.getItem("token");
        if(existToken) {
            localStorage.removeItem("token");
        }
    }

    const getSubjects = async() => {
        try {
            const response = await axios.get(`${URL}/subjects`, config);
            setSubjects(response.data);
        } catch(error) {
            logoutUser();
        }

    }

    const getStudents = async() => {
        try {
            const res = await axios.get(`${URL}/users/users-list`, config);
            setStudents(res.data);
        } catch(err) {
            console.log(err);
            logoutUser();
        }
    }




    return (
        <UserContext.Provider value={{ auth, toggleAuth, studentList, getStudentList, token, logoutUser, getSubjects, students, subjects }}>
            {props.children}
        </UserContext.Provider>
    );
};
