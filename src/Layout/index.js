import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarStyles from "../components/Navigations/AppBarStyles";
import DrawerStyles from "../components/Navigations/DrawerStyles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarStyles isOpen={open} setIsOpen={setOpen} />
      <DrawerStyles isOpen={open} setIsOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
