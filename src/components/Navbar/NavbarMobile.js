import React from 'react'
import {
    Box,
    AppBar,
    Button,
    IconButton,
    Typography,
    Toolbar,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

const NavbarMobile = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
    <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
        >
        <Menu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Tailweb
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
    </Toolbar>
    </AppBar>
</Box>
  )
}
export default NavbarMobile;
