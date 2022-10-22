import { FilterList } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import SelectComponent from "./SelectComponent";

function FilterData() {
  const [value, setValue] = useState("student");
  const { students, subjects } = useContext(UserContext);

  // const { token, logoutUser } = useContext(UserContext);
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  console.log(students);
  useEffect(() => {
    // getStudents();
  }, []);

  console.log(value);
  return (
    <>
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          {/* <Typography variant="body1">Filter by</Typography> */}

          {/* <FormControl >
        <InputLabel id="demo-simple-select-label">Value</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Value"
          onChange={handleChange}
        >
          <MenuItem value="all">Ten</MenuItem>
          <MenuItem value="user">Twenty</MenuItem>
          <MenuItem value="subject">Thirty</MenuItem>
        </Select>
      </FormControl> */}

          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Filter By
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="sucject"
                control={<Radio />}
                label="Subject"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          {value === "student" ? (
            <SelectComponent label="Student" data={students} />
          ) : (
            <SelectComponent label="Subjects" data={subjects} />
          )}
          <IconButton color="secondary">
            <FilterList />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
}

export default FilterData;
