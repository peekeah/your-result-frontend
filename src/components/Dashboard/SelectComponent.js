import { FilterList } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function SelectComponent({ data, label }) {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  console.log(data, label)

  useEffect(() => {
    label === 'Student' ? setValue("") : setValue("");
    setValue(data[0]);
  }, [])

  const handleSubmit= () => {
    console.log(label === 'Student' ? 'student' : 'subject');
  }
  return (
    <>
      <FormControl style={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
         <MenuItem value="All">
              All
            </MenuItem>
          {data.map((s, id) => (
            <MenuItem key={id} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton color="secondary"  onClick={handleSubmit}>
        <FilterList />
      </IconButton>
    </>
  );
}

export default SelectComponent;
