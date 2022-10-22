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
        <Box >
            <Toolbar style={{maxWidth: '1024px', margin:"auto", display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h6" component="div" style={{flexGrow: 1, fontFamily: 'Courgette', cursor: 'pointer', fontSize: '1.5rem'}}>
                Tailweb
            </Typography>
            <Box>
                <Button
                    color="inherit"
                    sx={{ display: auth ? "block" : "none" }}
                    onClick={toggleAuth}
                >
                    Logout
                </Button>
            </Box>
            </Toolbar>
            </Box>
        </AppBar>
        </Box>
    );
};

export default NavbarDesktop;
