import React, { useContext, useState } from "react";
import LoginForm from "./LoginForm";
import { Box } from "@mui/material";
import { SignupForm } from "./SignupForm";
import UserContext from "../context/UserContext";
import { Dashboard } from "./Dashboard";

export const Home = () => {
  const [loginForm, toggleLoginForm] = useState(true);
  const { auth } = useContext(UserContext);
  console.log(auth);
  return (
    <>
      {!auth ? (
        <Box>
          {loginForm ? (
            <LoginForm toggleLoginForm={toggleLoginForm} />
          ) : (
            <SignupForm toggleLoginForm={toggleLoginForm} />
          )}
        </Box>
      ) : (
        <Dashboard />
      )}
    </>
  );
};
