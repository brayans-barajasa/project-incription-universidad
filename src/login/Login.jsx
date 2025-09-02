import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../db/firebaseConfig";

// MUI
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Redirección según rol
      if (email === "admin@uni.edu.co") {
        navigate("/dashboard");
      } else {
        navigate("/preinscripcion");
      }

      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: "Has iniciado sesión correctamente.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de inicio de sesión",
        text: "Verifica tu correo o contraseña.",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1a237e, #283593)",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          {/* Logo */}
          <Avatar
            sx={{
              bgcolor: "#1a237e",
              width: 64,
              height: 64,
              margin: "0 auto",
              mb: 2,
            }}
          >
            <SchoolIcon sx={{ fontSize: 40 }} />
          </Avatar>

          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
            Universidad del Futuro
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "text.secondary", mb: 3 }}
          >
            Portal de Admisiones
          </Typography>

          {/* Formulario */}
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              label="Correo institucional"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
              autoComplete="email"
            />

            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
              autoComplete="current-password"
              sx={{ mb: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#1a237e",
                "&:hover": { bgcolor: "#0d1b57" },
                borderRadius: 2,
                py: 1.2,
                fontWeight: "bold",
                mt: 2,
              }}
            >
              Ingresar
            </Button>
          </Box>

          {/* Links secundarios */}
          <Typography
            variant="body2"
            sx={{ mt: 2, color: "primary.main", cursor: "pointer" }}
          >
            ¿Olvidaste tu contraseña?
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
