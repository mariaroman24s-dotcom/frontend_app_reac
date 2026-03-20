import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/api";

export default function Login(){

const navigate = useNavigate();

const [correo,setCorreo] = useState("");
const [contra,setContra] = useState("");

const handleLogin = async (e) => {

e.preventDefault();

const res = await loginUsuario({correo,contra});

if(res.data.success){

navigate("/menu");

}else{

alert("Usuario o contraseña incorrectos");

}

};

return(

<div className="flex items-center justify-center h-screen bg-green-300">

<form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-96">

<h2 className="text-3xl font-bold mb-6 text-center text-green-600">
Recetario Fit
</h2>

<input
type="email"
placeholder="Correo"
className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
value={correo}
onChange={(e)=>setCorreo(e.target.value)}
/>

<input
type="password"
placeholder="Contraseña"
className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
value={contra}
onChange={(e)=>setContra(e.target.value)}
/>

<button className="bg-green-500 hover:bg-green-600 text-white w-full p-3 rounded-lg font-semibold transition">
Entrar
</button>

<p className="text-center mt-4 text-gray-600">
¿No tienes cuenta?
<a href="/registro" className="text-green-600 ml-1 font-semibold hover:underline">
Registrate
</a>
</p>

</form>

</div>

);

}