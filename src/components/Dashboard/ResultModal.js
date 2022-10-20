import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import * as yup from "yup";
import UserContext from "../../context/UserContext";

const ResultModal = ({ closeModal, selectedItem, setSelectedItem }) => {
  const style = {
    position: "absolute",
    top: "42%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const URL = process.env.REACT_APP_BACKEND_API;

  const {__v, _id, ...initialValues} = selectedItem;

  const {getStudentList, logoutUser}  = useContext(UserContext);

  const schema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    subject: yup.string().required("Subject is Required"),
    marks: yup.number().typeError("Marks must be a number").required("Marks are Required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token")) || "";
        const res = await axios.patch(`${URL}/result/update/${_id}`, values, {
          headers: {
            "access-token": token
          }
        });
        if(res.data) {
          getStudentList();
        } else {
          logoutUser();
        }
        closeModal();
    } catch (err) {
        console.log(err);
        logoutUser();
    }
    setSelectedItem(null);
  };

  return (
    <Modal
      open={true}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    <Box style={style} >
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
        }) => (
          <Form onSubmit={handleSubmit} >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                mb={2}
              >
                Edit Data
              </Typography>
              <Box>
                <Stack spacing={2}>
                  <TextField
                    variant="outlined"
                    label="subject"
                    name="subject"
                    value={values.subject}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.subject && errors.subject)}
                    helperText={touched.subject && errors.subject}
                  />
                  <TextField
                    variant="outlined"
                    label="marks"
                    name="marks"
                    value={values.marks}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.marks && errors.marks)}
                    helperText={touched.marks && errors.marks}
                  />
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
      </Box>
    </Modal>
  );
};

export default ResultModal;
