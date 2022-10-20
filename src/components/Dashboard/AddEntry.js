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
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { Formik, Form } from "formik";
import UserContext from "../../context/UserContext";

//#BUG: Add entry is throwing an error,
function AddEntry({ setOpenAddModal }) {
  const URL = process.env.REACT_APP_BACKEND_API;
  const { token, logoutUser, getStudentList }  = useContext(UserContext);
  const [studentList, setStudentList] = useState([]);
  
  

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

  let initialValues = {
    name: "",
    subject: "",
    marks: "",
  };

  const schema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    subject: yup.string().required("Subject is Required"),
    marks: yup.number().typeError("Marks must be a number").required("Marks are Required"),
  });


  const getData = async() => {
    
    try {
      const res = await axios.get(`${URL}/users/users-list`, {
        headers: {
          "access-token": token
        }
      });
      setStudentList(res.data);
      initialValues.name = res.data[0];
    } catch(err) {
      console.log(err);
      logoutUser();
    }
  }
  
  useEffect(() => {
    getData();
  },[])
  
  const handleSubmit = async (values) => {
    console.log("first");
    try {
      const res = await axios.post(`${URL}/result/create`, values, {
        headers: {
          "access-token": token
        }
      });
      console.log(res);
      getStudentList();
    } catch (err) {
      console.log(err);
      // logoutUser()
    }
    setOpenAddModal(false);
  };

  console.log()

  return (
    <Modal
      open={true}
      onClose={() => setOpenAddModal(false)}
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Name</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.name}
                    name="name"
                    label="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    
                  >
                  {
                    studentList.map((s, id) => 
                    <MenuItem key={id} value={s}>{s}</MenuItem>
                    )
                  }
                  </Select>
                </FormControl>
                  <TextField
                    label="Subject"
                    variant="outlined"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.subject && errors.subject)}
                    helperText={touched.subject && errors.subject}
                  />
                  <TextField
                    label="Marks"
                    variant="outlined"
                    name="marks"
                    value={values.marks}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.marks && errors.marks)}
                    helperText={touched.marks && errors.marks}
                  />
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Stack>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

export default AddEntry;
