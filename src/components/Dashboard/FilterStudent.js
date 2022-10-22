import { FilterList } from "@mui/icons-material";
import {
    Box,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

function FilterStudent() {
    const [value, setValue] = useState("All");
    const { students, filterResultByStudent } = useContext(UserContext);
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    const handleSubmit = async () => {
        filterResultByStudent(value);

    };

    return (
        <Box>
            <FormControl style={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Student</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Student"
                    onChange={handleChange}
                >
                    <MenuItem key={-1} value="All">
                    All
                    </MenuItem>
                {students.map((s, id) => (
                    <MenuItem key={id} value={s}>
                    {s}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <IconButton color="secondary" onClick={handleSubmit}>
                <FilterList />
            </IconButton>
        </Box>
    );
}

export default FilterStudent;
