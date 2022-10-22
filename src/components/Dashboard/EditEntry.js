import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import * as yup from "yup";
import UserContext from "../../context/UserContext";

const EditEntry = ({ closeModal, selectedItem, setSelectedItem }) => {
  const style = {
    position: "absolute",
    top: "42%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "0.5rem",
    boxShadow: 24,
    p: 4,
  };
  const URL = process.env.REACT_APP_BACKEND_API;

  const { __v, _id, ...initialValues } = selectedItem;

  const { getStudentList, logoutUser, subjects } = useContext(UserContext);

  const schema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    subject: yup.string().required("Subject is Required"),
    marks: yup
      .number()
      .typeError("Marks must be a number")
      .required("Marks are Required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token")) || "";
      const res = await axios.patch(`${URL}/result/update/${_id}`, values, {
        headers: {
          "access-token": token,
        },
      });
      if (res.data) {
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
      <Box style={style}>
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
            <Form onSubmit={handleSubmit}>
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h5"
                  component="h2"
                  mb={2}
                  align="center"
                >
                  Edit Entry
                </Typography>
                <Box>
                  <Stack spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Subject
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.subject}
                        name="subject"
                        label="Subject"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {subjects.map((s, id) => (
                          <MenuItem key={id} value={s}>
                            {s}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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

export default EditEntry;
