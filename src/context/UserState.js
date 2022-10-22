import React, {useState} from "react";
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
    const [result, setResult] = useState([]);
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
    const getResult = async() => {
        try {
            const res = await axios.get(`${URL}/result/display-entries`, config);
            if (res.data) {
                setResult(res.data);
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


    // Function to delte logout use and delete token from localstorage
    const logoutUser = () => {
        setAuth(false);
        const existToken = localStorage.getItem("token");
        if(existToken) {
            localStorage.removeItem("token");
        }
    }

    // Function to get all subjects
    const getSubjects = async() => {
        try {
            const res = await axios.get(`${URL}/subjects`, config);
            setSubjects(res.data);
        } catch(error) {
            logoutUser();
        }
    }
    
    // Function to get all Students
    const getStudents = async() => {
        try {
            const res = await axios.get(`${URL}/users/users-list`, config);
            setStudents(res.data);
        } catch(err) {
            console.log(err);
            logoutUser();
        }
    }

    // Filter result by student
    const filterResultByStudent = async(value) => {
        if(value !== 'All') {
            try {
                const response = await axios.post(`${URL}/result/filter-result-by-student`, {name: value}, config);
                setResult(response.data);
                
            } catch(error) {
                logoutUser();
            }
        } else {
            getResult();
        }
    }

    // Filter result by subject
    const filterResultBySubject = async(value) => {
        if(value !== 'All')  {
            try {
                const response = await axios.post(`${URL}/result/filter-result-by-subject`, {subject: value}, config);
                setResult(response.data);
                
            } catch(error) {
                logoutUser();
            }  
        } else {
            getResult();
        }
    }

    return (
        <UserContext.Provider value={{ auth, toggleAuth, result, getResult, token, logoutUser, getSubjects, students, subjects, filterResultByStudent, filterResultBySubject, config }}>
            {props.children}
        </UserContext.Provider>
    );
};
