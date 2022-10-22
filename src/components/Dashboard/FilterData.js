import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import FilterSubject from "./FilterSubject";
import FilterStudent from "./FilterStudent";

function FilterData() {
  const [value, setValue] = useState("student");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
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
          {value === "student" ? <FilterStudent /> : <FilterSubject />  }
        </Stack>
      </Stack>
    </>
  );
}

export default FilterData;
