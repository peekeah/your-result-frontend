import React from "react";
import { Box } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavbarDesktop";
export const Navbar = () => {
    const theme = useTheme();
    const isMatched = useMediaQuery(theme.breakpoints.down("md"));
    return <Box>{isMatched ? <NavbarMobile /> : <NavbarDesktop />}</Box>;
};
