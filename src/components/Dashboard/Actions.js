import { Box, IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";

function Actions({id, setOpenModal, item, setSelectedItem}) {

    const URL = process.env.REACT_APP_BACKEND_API;
    const token = JSON.parse(localStorage.getItem('token')) || "";
    const { getStudentList} = useContext(UserContext);
    const handleDelete = async() => {

        try {
            const res = await axios.delete(`${URL}/result/delete/${id}`, {
                headers: {
                    "access-token": token
                }
            })
            getStudentList();
            
        } catch (error) {
            console.log(error);
        }

    }


    const handleEdit = async() => {
        setSelectedItem(item);
        setOpenModal(true)
    }

    return (
    <Box>
        <Stack spacing={1} direction='row' sx={{display: 'flex', justifyContent: 'center', }}>
            <IconButton color="success" onClick={handleEdit} >
            <Edit />
            </IconButton>
            <IconButton color="warning" onClick={handleDelete} >
            <Delete />
            </IconButton>
        </Stack>
    </Box>
    );
}

export default Actions;
