import { FilterList } from "@mui/icons-material";
import {
    Box,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";

function FilterSubject() {
    const [value, setValue] = useState("All");
    const { subjects, filterResultBySubject } = useContext(UserContext);
    const handleChange = (e) => {
        console.log(e.target.value);
        setValue(e.target.value);
    };
    const handleSubmit = async () => {
        console.log("submit");
        filterResultBySubject(value);
    };
    return (
        <Box>
            <FormControl style={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Subject"
                    onChange={handleChange}
                >
                <MenuItem key={-1} value="All">
                    All
                </MenuItem>
                {subjects.map((s, id) => (
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

export default FilterSubject;
