import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import UserContext from "../../context/UserContext";
import axios from "axios";
function StudentDashboard() {
  const URL = process.env.REACT_APP_BACKEND_API;
  const { logoutUser, config } = useContext(UserContext);

  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.post(`${URL}/users/get-data`, {}, config);
      setData(res.data);
    } catch (err) {
      console.log(err);
      logoutUser();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ mx: { xs: 5, sm: 10, md: 15 }, my: {xs: 10, md: 15, lg: 18} }}>
    <Typography variant="h3" align="center" my={3}>Result</Typography>
      {data.length > 0 ? (
        <TableContainer
          style={{ maxWidth: "1024px", margin: "auto" }}
          component={Paper}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Subject</TableCell>
                <TableCell align="center">Marks</TableCell>
                <TableCell align="center">Out Of</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.subject}
                  </TableCell>
                  <TableCell align="center">{row.marks}</TableCell>
                  <TableCell align="center">100</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">No data to display</Typography>
        </Box>
      )}
    </Box>
  );
}

export default StudentDashboard;
