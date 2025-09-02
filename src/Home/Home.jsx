import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Universidad del Futuro</h1>
          <p>
            Una institución líder en innovación, investigación y formación
            académica para transformar la sociedad.
          </p>
          <button className="btn-primary">Conoce más</button>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
            alt="Campus universitario"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>Sobre Nosotros</h2>
        <p>
          Con más de 50 años de experiencia, la Universidad del Futuro se ha
          consolidado como una de las principales instituciones de educación
          superior en América Latina. Nos destacamos por nuestro enfoque en la
          innovación, la investigación científica y el compromiso social.
        </p>
      </section>

      {/* Programs Section */}
      <section className="programs">
        <h2>Nuestros Programas</h2>
        <div className="program-list">
          <div className="program-card">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
              alt="Ingeniería"
            />
            <h3>Ingeniería</h3>
            <p>
              Carreras en Software, Civil, Mecatrónica y Energías Renovables.
            </p>
          </div>
          <div className="program-card">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
              alt="Medicina"
            />
            <h3>Medicina</h3>
            <p>
              Programas de Medicina, Enfermería y Biotecnología con enfoque en
              la salud global.
            </p>
          </div>
          <div className="program-card">
            <img
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0"
              alt="Administración"
            />
            <h3>Administración</h3>
            <p>
              Administración, Finanzas y Negocios Internacionales con visión
              empresarial moderna.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="faculty">
        <h2>Nuestros Docentes</h2>
        <div className="faculty-list">
          <div className="faculty-card">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profesor"
            />
            <h3>Dr. Juan Pérez</h3>
            <p>Investigador en Inteligencia Artificial</p>
          </div>
          <div className="faculty-card">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Profesora"
            />
            <h3>Dra. Ana Gómez</h3>
            <p>Especialista en Salud Pública</p>
          </div>
          <div className="faculty-card">
            <img
              src="https://randomuser.me/api/portraits/men/65.jpg"
              alt="Profesor"
            />
            <h3>Dr. Carlos Ríos</h3>
            <p>Experto en Finanzas Internacionales</p>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements">
        <h2>Logros y Reconocimientos</h2>
        <ul>
          <li>🌎 Top 100 universidades de Latinoamérica</li>
          <li>📊 Más de 30,000 egresados trabajando globalmente</li>
          <li>🏆 Acreditación internacional en 10 programas académicos</li>
        </ul>
      </section>

      {/* Events Section */}
      <section className="events">
        <h2>Eventos y Noticias</h2>
        <div className="event-list">
          <div className="event-card">
            <h3>Semana de la Ciencia</h3>
            <p>Del 10 al 15 de septiembre</p>
          </div>
          <div className="event-card">
            <h3>Conferencia de Innovación</h3>
            <p>20 de octubre - Auditorio Central</p>
          </div>
          <div className="event-card">
            <h3>Feria de Empleo</h3>
            <p>5 de noviembre - Campus Principal</p>
          </div>
        </div>
      </section>

      {/* Campus Section */}
      <section className="campus">
        <h2>Vida en el Campus</h2>
        <p>
          Disfruta de instalaciones modernas, laboratorios de última generación,
          bibliotecas digitales y una vibrante vida universitaria.
        </p>
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
          alt="Campus"
        />
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2>Contacto</h2>
        <p>Email: info@universidaddelfuturo.edu</p>
        <p>Tel: +57 300 123 4567</p>
        <button className="btn-primary">Solicitar Información</button>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>¿Listo para tu futuro?</h2>
        <p>
          Inscríbete ahora y comienza tu camino hacia una carrera exitosa y con
          impacto global.
        </p>
        <Link to="/preinscripcion">
          <button className="btn-secondary">Inscríbete Ahora</button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
