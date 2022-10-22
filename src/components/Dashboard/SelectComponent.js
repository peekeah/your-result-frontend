import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

function SelectComponent({ data, label }) {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <FormControl style={{minWidth: 120}}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={handleChange}
      >
        {data.map((s, id) => (
          <MenuItem key={id} value={s}>{s}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectComponent;
