import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ background: "#004aad" }}>
      <Toolbar>
        {/* Logo o Nombre */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          Universidad del Futuro
        </Typography>

        {/* Links con react-router */}
        <Box>
          <Button color="inherit" component={Link} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={Link} to="/preinscripcion">
            Preinscripción
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
