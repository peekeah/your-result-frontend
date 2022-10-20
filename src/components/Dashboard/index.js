import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";

export const Dashboard = () => {
  const [role, setRole] = useState(null);
  const URL = process.env.REACT_APP_BACKEND_API;
  const { token, logoutUser } = useContext(UserContext);
  console.log(URL)
  const getData = async () => {
    try {
      const res = await axios.post(`${URL}/users/is-admin`, {}, {
        headers: {
          "access-token": token,
        },
      });
      if (res.data) {
        setRole("admin");
      } else {
        setRole("student");
      }
    } catch (err) {
      console.log(err);
      logoutUser();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {role === "admin" ? (
        <AdminDashboard />
      ) : role === "student" ? (
        <StudentDashboard />
      ) : null}
    </div>
  );
};
