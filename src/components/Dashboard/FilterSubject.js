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

function FilterSubject() {
    const [value, setValue] = useState("All");
    const { subjects, filterResultBySubject } = useContext(UserContext);
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    const handleSubmit = async () => {
        filterResultBySubject(value);
    };
    return (
        <Stack direction="row" gap={1} >
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
        </Stack>
    );
}

export default FilterSubject;
