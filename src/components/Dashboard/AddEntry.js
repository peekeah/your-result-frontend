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
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { Formik, Form } from "formik";


//#BUG: Add entry is throwing an error, 
function AddEntry({ setOpenModal }) {
  const URL = process.env.REACT_APP_BACKEND_API;

  const style = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [selectedStudent, setSelectedStudent] = useState("");
  const [students, setStudents] = useState([]);

  let initialValues = {
    // name: "",
    subject: "",
    marks: "",
  };

  const schema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    subject: yup.string().required("Subject is Required"),
    marks: yup.number().required("Marks are Required"),
  });

  //   const [formData, setFormData] = useState({
  //       name: "",
  //       subject: "",
  //       marks:""
  //   })

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    const token = JSON.parse(localStorage.getItem("token")) || "";
    const res = await axios.get(`${URL}/users/users-list`, {
      headers: {
        "access-token": token,
      },
    });

    const data = res.data;
    setStudents(data);
    // initialValues['name'] = data[0];
    // console.log(data)

    // setFormData((prev) => ({
    //     ...prev,
    //     ['name']: res.data[0]
    // }))
  };

  // const handleChange = (e) => {
  //     // setSelectedStudent(e.target.value);
  //     const {name, value} = e.target;
  //     setFormData((prev) => ({
  //         ...prev,
  //         [name]: value
  //     }))
  // };

  const handleSubmit = async () => {
    // e.preventDefault();
    // console.log(formData)
    console.log("first");
    setOpenModal(false);
  };

  //   console.log(initialValues)

  return (
    <Modal
      open={true}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
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
            <Box sx={style}>
              <Typography
                mb={3}
                id="modal-modal-title"
                variant="h5"
                component="h2"
              >
                Add Entry
              </Typography>
              <Stack spacing={3}>
                {/* <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Name</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.name}
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {students.map((s, id) => (
                      <MenuItem key={id} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
                <TextField
                  label="Subject"
                  variant="outlined"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  label="Marks"
                  variant="outlined"
                  name="marks"
                  value={values.marks}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Stack>
            </Box>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default AddEntry;
