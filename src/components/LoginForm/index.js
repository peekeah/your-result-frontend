import React, { useContext, useState } from "react";
import { Alert, Box, Button, Snackbar, styled, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { Formik, Form } from "formik";
import axios from "axios";
import UserContext from "../../context/UserContext";

function LoginForm({toggleLoginForm}) {

    const URL = process.env.REACT_APP_BACKEND_API;
    const {toggleAuth} = useContext(UserContext);

    const [openSnackBar, setOpenSnackBar] = useState(false);

    const schema = yup.object().shape({
        email: yup.string().required("Email is Required").email(),
        password: yup
        .string().required("Password is Required")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    });

    const initialValues = {
        email: "",
        password: "",
    };

    const StyledBox = styled(Box)({
        display: "flex",
        gap: 25,
        flexDirection: "column",
        justifyContent: "center",
        margin: "auto",
        width: "30%",
    });

    const handleSubmit = async(values, {resetForm}) => {
        try {
            const res = await axios.post(`${URL}/users/login`, values);
            localStorage.setItem('token', JSON.stringify(res.data));
            toggleAuth();
            
        } catch (err) {
            console.log(err);
            setOpenSnackBar(true);
        }
        resetForm();

    };

    return (<>
        <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
        >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
        }) => (
            <Form>
            <Box sx={{ mt: "8%" }}>
            <StyledBox>
                <Typography variant="h3" mx="auto">
                Login
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={values.password}
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                />
                <Typography variant="body1">Not a user? <span style={{cursor: 'pointer', color: 'blue'}} onClick={() => toggleLoginForm(false)} >Create new account</span></Typography>
                <Button variant="contained" color="secondary" type="submit">
                Login
                </Button>
            </StyledBox>
            </Box>
        </Form>
        )}
        </Formik>
        <Snackbar open={openSnackBar} autoHideDuration={5000} onClose={() => setOpenSnackBar(false)}>
            <Alert onClose={() => setOpenSnackBar(false)} severity="error">Invalid Credintials
            </Alert>
        </Snackbar>
        </>
    );
}

export default LoginForm;
