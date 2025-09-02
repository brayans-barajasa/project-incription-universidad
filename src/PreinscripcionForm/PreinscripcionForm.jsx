import React, { useState } from "react";
import Swal from "sweetalert2";
import "./PreinscripcionForm.css";
import { db } from "../db/firebaseConfig"; // Asegúrate de que el path sea correcto
import { collection, addDoc, Timestamp } from "firebase/firestore";

const PreinscripcionForm = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    genero: "",
    fechaNacimiento: "",
    tipoDocumento: "",
    numeroDocumento: "",
    nacionalidad: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    estado: "",
    pais: "",
    codigoPostal: "",
    colegio: "",
    anioGraduacion: "",
    promedio: "",
    carreraDeseada: "",
    modalidad: "",
    comentarios: "",
    aceptaTerminos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validación de términos
    if (!formData.aceptaTerminos) {
      Swal.fire({
        icon: "warning",
        title: "Términos no aceptados",
        text: "Debes aceptar los términos y condiciones para continuar.",
      });
      return;
    }

    // 2. Validar correo electrónico
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Swal.fire({
        icon: "error",
        title: "Correo inválido",
        text: "Por favor, ingresa un correo electrónico válido.",
      });
      return;
    }

    // 3. Validar teléfono (solo números y al menos 7 dígitos)
    if (!/^\d{7,15}$/.test(formData.telefono)) {
      Swal.fire({
        icon: "error",
        title: "Teléfono inválido",
        text: "El teléfono debe contener solo números y entre 7 y 15 dígitos.",
      });
      return;
    }

    // 4. Validar fecha de nacimiento (mayor de edad)
    const hoy = new Date();
    const fechaNac = new Date(formData.fechaNacimiento);
    const edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    const esMenor = edad < 18 || (edad === 18 && mes < 0);

    if (esMenor) {
      Swal.fire({
        icon: "error",
        title: "Edad no válida",
        text: "Debes ser mayor de 18 años para realizar la preinscripción.",
      });
      return;
    }

    // 5. Validar año de graduación (no puede ser mayor al actual)
    const anioActual = hoy.getFullYear();
    if (formData.anioGraduacion > anioActual) {
      Swal.fire({
        icon: "error",
        title: "Año inválido",
        text: "El año de graduación no puede ser mayor al actual.",
      });
      return;
    }

    // 6. Validación de campos obligatorios
    const camposObligatorios = [
      "nombres",
      "apellidos",
      "genero",
      "fechaNacimiento",
      "tipoDocumento",
      "numeroDocumento",
      "nacionalidad",
      "email",
      "telefono",
      "direccion",
      "ciudad",
      "pais",
      "colegio",
      "anioGraduacion",
      "carreraDeseada",
      "modalidad",
    ];

    const faltantes = camposObligatorios.filter((campo) => !formData[campo]);

    if (faltantes.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos obligatorios.",
      });
      return;
    }

    // --- Guardar en Firestore ---
    try {
      const docRef = await addDoc(collection(db, "preinscripciones"), {
        ...formData,
        creadoEn: Timestamp.now(),
      });

      Swal.fire({
        icon: "success",
        title: "Formulario enviado",
        text: "Tu preinscripción fue guardada correctamente. ID: " + docRef.id,
      });

      // Resetear el formulario
      setFormData({
        nombres: "",
        apellidos: "",
        genero: "",
        fechaNacimiento: "",
        tipoDocumento: "",
        numeroDocumento: "",
        nacionalidad: "",
        email: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        estado: "",
        pais: "",
        codigoPostal: "",
        colegio: "",
        anioGraduacion: "",
        promedio: "",
        carreraDeseada: "",
        modalidad: "",
        comentarios: "",
        aceptaTerminos: false,
      });
    } catch (error) {
      console.error("Error al guardar la preinscripción:", error);

      Swal.fire({
        icon: "error",
        title: "Error al enviar",
        text: "Ocurrió un problema al guardar la preinscripción. Intenta más tarde.",
      });
    }
  };

  return (
    <div className="form-container">
      <h1>Formulario de Preinscripción Universitaria</h1>
      <form onSubmit={handleSubmit} className="form">
        {/* Información Personal */}
        <fieldset>
          <legend>Información Personal</legend>
          <input
            type="text"
            name="nombres"
            placeholder="Nombres"
            value={formData.nombres}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />

          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Género</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>

          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />

          <select
            name="tipoDocumento"
            value={formData.tipoDocumento}
            onChange={handleChange}
            required
          >
            <option value="">Tipo de Documento</option>
            <option value="dni">DNI</option>
            <option value="pasaporte">Pasaporte</option>
            <option value="cedula">Cédula</option>
          </select>

          <input
            type="text"
            name="numeroDocumento"
            placeholder="Número de Documento"
            value={formData.numeroDocumento}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nacionalidad"
            placeholder="Nacionalidad"
            value={formData.nacionalidad}
            onChange={handleChange}
            required
          />
        </fieldset>

        {/* Información de Contacto */}
        <fieldset>
          <legend>Información de Contacto</legend>
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="ciudad"
            placeholder="Ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="estado"
            placeholder="Estado / Provincia"
            value={formData.estado}
            onChange={handleChange}
          />
          <input
            type="text"
            name="pais"
            placeholder="País"
            value={formData.pais}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="codigoPostal"
            placeholder="Código Postal"
            value={formData.codigoPostal}
            onChange={handleChange}
          />
        </fieldset>

        {/* Información Académica */}
        <fieldset>
          <legend>Información Académica</legend>
          <input
            type="text"
            name="colegio"
            placeholder="Nombre del Colegio"
            value={formData.colegio}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="anioGraduacion"
            placeholder="Año de Graduación"
            value={formData.anioGraduacion}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="promedio"
            placeholder="Promedio General"
            step="0.01"
            value={formData.promedio}
            onChange={handleChange}
          />
        </fieldset>

        {/* Datos de Inscripción */}
        <fieldset>
          <legend>Datos de Preinscripción</legend>
          <input
            type="text"
            name="carreraDeseada"
            placeholder="Carrera Deseada"
            value={formData.carreraDeseada}
            onChange={handleChange}
            required
          />

          <select
            name="modalidad"
            value={formData.modalidad}
            onChange={handleChange}
            required
          >
            <option value="">Modalidad</option>
            <option value="presencial">Presencial</option>
            <option value="virtual">Virtual</option>
            <option value="hibrido">Híbrido</option>
          </select>

          <textarea
            name="comentarios"
            placeholder="Comentarios adicionales"
            rows="4"
            value={formData.comentarios}
            onChange={handleChange}
          ></textarea>
        </fieldset>

        {/* Términos */}
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="aceptaTerminos"
            checked={formData.aceptaTerminos}
            onChange={handleChange}
            required
          />
          Acepto los términos y condiciones.
        </label>

        <button type="submit">Enviar Preinscripción</button>
      </form>
    </div>
  );
};

export default PreinscripcionForm;
