import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario } from "../services/api";

export default function Registro(){

const navigate = useNavigate();

const [form,setForm] = useState({
nombre:"",
apellido_p:"",
apellido_m:"",
correo:"",
contra:""
});

const handleChange = (e)=>{
setForm({
...form,
[e.target.name]:e.target.value
});
};

const handleSubmit = async(e)=>{

e.preventDefault();

await registrarUsuario(form);

alert("Cuenta creada correctamente");

navigate("/menu");

};

return(

<div className="flex items-center justify-center h-screen bg-green-300">

<form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96">

<h2 className="text-3xl font-bold mb-6 text-center text-green-600">
Crear cuenta
</h2>

<input
name="nombre"
placeholder="Nombre"
className="border p-3 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
onChange={handleChange}
/>

<input
name="apellido_p"
placeholder="Apellido paterno"
className="border p-3 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
onChange={handleChange}
/>

<input
name="apellido_m"
placeholder="Apellido materno"
className="border p-3 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
onChange={handleChange}
/>

<input
name="correo"
placeholder="Correo"
className="border p-3 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
onChange={handleChange}
/>

<input
type="password"
name="contra"
placeholder="Contraseña"
className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
onChange={handleChange}
/>

<button className="bg-green-500 hover:bg-green-600 text-white w-full p-3 rounded-lg font-semibold transition">
Registrarse
</button>

<p className="text-center mt-4 text-gray-600">
¿Ya tienes cuenta?
<a href="/.." className="text-green-600 ml-1 font-semibold hover:underline">
Inicia sesión
</a>
</p>

</form>

</div>

);

}