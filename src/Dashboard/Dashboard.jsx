import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Divider,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, Routes, Route } from "react-router-dom";
import { auth } from "../db/firebaseConfig";
import { signOut } from "firebase/auth";

// Importa la tabla de preinscripciones
import TablaPreinscripciones from "../TablaPreinscripciones/TablaPreinscripciones";

const drawerWidth = 240;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Redirige al login
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#004aad" }}>
          Admisiones
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {[
          { text: "Panel", icon: <SchoolIcon />, path: "/dashboard" },
          { text: "Preinscripciones", icon: <PeopleIcon />, path: "/listado" },
          { text: "Eventos", icon: <EventIcon />, path: "/eventos" },
          { text: "Configuración", icon: <SettingsIcon />, path: "/config" },
        ].map((item, index) => (
          <ListItem button key={index} onClick={() => navigate(item.path)}>
            <ListItemIcon sx={{ color: "#004aad" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* Cerrar sesión */}
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon sx={{ color: "red" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "#004aad",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Universidad del Futuro - Panel Admin
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="menu"
      >
        {/* Drawer para mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Drawer fijo en desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Contenido principal con rutas internas */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Routes>
          {/* Vista principal */}
          <Route
            path="/dashboard"
            element={
              <>
                <Typography variant="h4" gutterBottom>
                  Bienvenido al Panel de Admisiones 🎓
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ boxShadow: 3 }}>
                      <CardContent>
                        <Typography variant="h6">Preinscripciones</Typography>
                        <Typography variant="h4" sx={{ color: "#004aad" }}>
                          120
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ boxShadow: 3 }}>
                      <CardContent>
                        <Typography variant="h6">
                          Estudiantes Admitidos
                        </Typography>
                        <Typography variant="h4" sx={{ color: "#004aad" }}>
                          85
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ boxShadow: 3 }}>
                      <CardContent>
                        <Typography variant="h6">Eventos Próximos</Typography>
                        <Typography variant="h4" sx={{ color: "#004aad" }}>
                          5
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </>
            }
          />

          {/* Vista de tabla de preinscripciones */}
          <Route path="/listado" element={<TablaPreinscripciones />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
