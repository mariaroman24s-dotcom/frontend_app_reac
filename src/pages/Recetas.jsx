import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Alert from "../components/Alert";
import Table from "../components/Table";

import { obtenerRecetas, crearReceta, eliminarReceta } from "../services/api";

export default function Recetas() {

const [recetas, setRecetas] = useState([]);

const [modalAgregar, setModalAgregar] = useState(false);
const [modalVer, setModalVer] = useState(false);

const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
const [editando, setEditando] = useState(false);
const [alert, setAlert] = useState("");

const [form, setForm] = useState({
  nombre: "",
  ingredientes: "",
  instrucciones: "",
  tiempo: "",
  calorias: "",
  proteina: ""
});

const navigate = useNavigate();

useEffect(() => {
  cargarRecetas();
}, []);

const cargarRecetas = async () => {
  const res = await obtenerRecetas();
  setRecetas(res.data);
};

const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = async (e) => {

  e.preventDefault();

  await crearReceta(form);

  setAlert("Nueva receta saludable agregada");

  setModalAgregar(false);

  setForm({
    nombre: "",
    ingredientes: "",
    instrucciones: "",
    tiempo: "",
    calorias: "",
    proteina: ""
  });

  cargarRecetas();
};

const actualizarReceta = async (e) => {

  e.preventDefault();

  await fetch(`http://localhost:3000/recetas/actualizar/${recetaSeleccionada.id_receta}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  });

  setAlert("Receta actualizada correctamente");

  setEditando(false);

  setModalAgregar(false);

  cargarRecetas();

};

const verReceta = (receta) => {
  setRecetaSeleccionada(receta);
  setModalVer(true);
};

const editarReceta = (receta) => {

  setForm({
    nombre: receta.nombre,
    ingredientes: receta.ingredientes,
    instrucciones: receta.instrucciones,
    tiempo: receta.tiempo,
    calorias: receta.calorias,
    proteina: receta.proteina
  });

  setRecetaSeleccionada(receta);
  setEditando(true);
  setModalAgregar(true);

};

const eliminar = async (id) => {

  await eliminarReceta(id);

  setAlert("Receta eliminada correctamente");

  cargarRecetas();

};

return (

<div className="min-h-screen bg-green-300 flex justify-center">

<div className="bg-white w-full max-w-5xl p-8 rounded-xl shadow-lg mt-10">

<div className="flex justify-between items-center mb-6">

<h1 className="text-3xl font-bold text-green-600">
Comidas Fit
</h1>

<button
onClick={() => navigate("/menu")}
className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
>
Volver al menú
</button>

</div>

<Alert message={alert} type="success" />

<button
onClick={() => setModalAgregar(true)}
className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg mb-4 font-semibold"
>
Agregar receta
</button>

<Table
columns={["Nombre", "Calorias", "Proteina"]}
data={recetas}
actions={(receta) => (

<div className="flex gap-2 justify-center">

<button
onClick={() => verReceta(receta)}
className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
>
Ver
</button>

<button
onClick={() => editarReceta(receta)}
className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
>
Editar
</button>

<button
onClick={() => eliminar(receta.id_receta)}
className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
>
Eliminar
</button>

</div>

)}
/>

<Modal
isOpen={modalAgregar}
onClose={() => setModalAgregar(false)}
title="Nueva receta fit"
>

<form onSubmit={editando ? actualizarReceta : handleSubmit} className="flex flex-col gap-3">

<input
name="nombre"
placeholder="Nombre"
value={form.nombre}
onChange={handleChange}
className="border p-3 rounded-lg"
/>

<textarea
name="ingredientes"
placeholder="Ingredientes"
value={form.ingredientes}
onChange={handleChange}
className="border p-3 rounded-lg"
/>

<textarea
name="instrucciones"
placeholder="Instrucciones"
value={form.instrucciones}
onChange={handleChange}
className="border p-3 rounded-lg"
/>

<input
name="tiempo"
placeholder="Tiempo de preparación"
value={form.tiempo}
onChange={handleChange}
className="border p-3 rounded-lg"
/>

<input
name="calorias"
placeholder="Calorias"
value={form.calorias}
onChange={handleChange}
className="border p-3 rounded-lg"
/>

<input
name="proteina"
placeholder="Proteina"
value={form.proteina}
onChange={handleChange}
className="border p-3 rounded-lg"
/>

<button
className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold">
Guardar receta
</button>

</form>

</Modal>

<Modal
isOpen={modalVer}
onClose={() => setModalVer(false)}
title="Detalles de la receta"
>

{recetaSeleccionada && (

<div className="flex flex-col gap-2">

<h2 className="text-xl font-bold">
{recetaSeleccionada.nombre}
</h2>

<p>
<strong>Ingredientes:</strong> {recetaSeleccionada.ingredientes}
</p>

<p>
<strong>Instrucciones:</strong> {recetaSeleccionada.instrucciones}
</p>

<p>
<strong>Tiempo:</strong> {recetaSeleccionada.tiempo} minutos
</p>

<p>
<strong>Calorias:</strong> {recetaSeleccionada.calorias}
</p>

<p>
<strong>Proteina:</strong> {recetaSeleccionada.proteina}
</p>

</div>

)}

</Modal>

</div>

</div>

);

}