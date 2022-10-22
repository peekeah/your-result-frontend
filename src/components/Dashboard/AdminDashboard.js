import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddEntry from "./AddEntry";
import Actions from "./Actions";
import UserContext from "../../context/UserContext";
import FilterData from "./FilterData";
import EditEntry from "./EditEntry";

function AdminDashboard() {
  const { getResult, result } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getResult();
  }, []);

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Box my={10} mx={5} sx={{ mx: { xs: 5, sm: 10, md: 15 } }}>
        <Box my={3}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={() => setOpenAddModal(true)}>
              Add Entry
            </Button>
          </Box>
        </Box>
        <Box my={3}>
          <FilterData />
        </Box>
        <Typography variant="h3" align="center" mt={5} mb={3} >Result</Typography>
        <TableContainer
          style={{ maxWidth: "1024px", margin: "auto" }}
          component={Paper}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Subject</TableCell>
                <TableCell align="center">Marks</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.subject}</TableCell>
                  <TableCell align="center">{row.marks}</TableCell>
                  <TableCell align="center">
                    <Actions
                      id={row._id}
                      setSelectedItem={setSelectedItem}
                      setOpenModal={setOpenModal}
                      item={row}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {openModal ? (
        <EditEntry
          closeModal={closeModal}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      ) : null}

      {openAddModal ? <AddEntry setOpenAddModal={setOpenAddModal} /> : null}
    </>
  );
}

export default AdminDashboard;
