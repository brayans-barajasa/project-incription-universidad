import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../db/firebaseConfig"; // ⚡ tu config de Firebase
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // ✅ Redirección según rol
      if (email === "admin@uni.edu.co") {
        navigate("/dashboard");
      } else {
        navigate("/preinscripcion");
      }

      alert("Inicio de sesión exitoso 🎉");
    } catch (error) {
      alert("Error: correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Universidad del Futuro</h2>
        <p className="login-subtitle">Portal de Admisiones</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo institucional"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">
            Ingresar
          </button>
        </form>

        <p className="login-forgot">¿Olvidaste tu contraseña?</p>
      </div>
    </div>
  );
};

export default Login;
