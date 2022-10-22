import { FilterList } from "@mui/icons-material";
import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
} from "@mui/material";
import React, { useContext, useState } from "react";
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
        <Stack direction="row" gap={1} >
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
        </Stack>
    );
}

export default FilterStudent;
