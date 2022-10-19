import React, { useContext } from "react";
import {
    Box,
    AppBar,
    Button,
    Typography,
    Toolbar,
} from "@mui/material";
import UserContext from "../../context/UserContext";

const NavbarDesktop = () => {
    const { auth, toggleAuth } = useContext(UserContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Tailweb
            </Typography>
            <Button
                color="inherit"
                sx={{ display: auth ? "block" : "none" }}
                onClick={toggleAuth}
            >
                Logout
            </Button>
            </Toolbar>
        </AppBar>
        </Box>
    );
};

export default NavbarDesktop;
