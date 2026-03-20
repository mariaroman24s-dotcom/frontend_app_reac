import axios from "axios";

const API = "https://backend-app-react.onrender.com";

/* LOGIN */

export const loginUsuario = (data) => {
  return axios.post(`${API}/usuarios/login`, data);
};

export const registrarUsuario = (data) => {
return axios.post(`${API}/usuarios/registrar`, data);
};

/* RECETAS */

export const obtenerRecetas = () => {
  return axios.get(`${API}/recetas/obtener`);
};

export const crearReceta = (data) => {
  return axios.post(`${API}/recetas/insertar`, data);
};

export const eliminarReceta = (id) => {
  return axios.delete(`${API}/recetas/eliminar/${id}`);
};

/* POSTRES */

export const obtenerPostres = () => {
  return axios.get(`${API}/postres/obtener`);
};

export const crearPostre = (data) => {
  return axios.post(`${API}/postres/insertar`, data);
};

export const eliminarPostre = (id) => {
  return axios.delete(`${API}/postres/eliminar/${id}`);
};