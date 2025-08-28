import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PreinscripcionForm from "./PreinscripcionForm/PreinscripcionForm";
import TablaPreinscripciones from "./TablaPreinscripciones/TablaPreinscripciones";
import "./app.css";

function App() {
  return (
    <Router>
      <header className="header">
        <div className="header-content">
          <h1 className="title">Universidad Nacional</h1>
          <p className="subtitle">
            Bienvenido a la plataforma de preinscripción universitaria. Aquí puedes inscribirte y consultar los datos de preinscripciones.
          </p>
          <nav className="nav">
            <Link className="btn" to="/preinscripcion">
              Completar Formulario
            </Link>
            <Link className="btn btn-secondary" to="/listado">
              Ver Listado de Preinscripciones
            </Link>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/preinscripcion" element={<PreinscripcionForm />} />
          <Route path="/listado" element={<TablaPreinscripciones />} />
          <Route
            path="*"
            element={
              <div className="home-placeholder">
                <p>Selecciona una opción del menú para comenzar.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
