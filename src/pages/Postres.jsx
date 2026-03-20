import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Alert from "../components/Alert";
import Table from "../components/Table";

import { obtenerPostres, crearPostre, eliminarPostre } from "../services/api";

export default function Postres() {

const [postres, setPostres] = useState([]);

const [modalAgregar, setModalAgregar] = useState(false);
const [modalVer, setModalVer] = useState(false);

const [postreSeleccionado, setPostreSeleccionado] = useState(null);
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
  cargarPostres();
}, []);

const cargarPostres = async () => {
  const res = await obtenerPostres();
  setPostres(res.data);
};

const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = async (e) => {

  e.preventDefault();

  await crearPostre(form);

  setAlert("Nuevo postre saludable agregado");

  setModalAgregar(false);

  setForm({
    nombre: "",
    ingredientes: "",
    instrucciones: "",
    tiempo: "",
    calorias: "",
    proteina: ""
  });

  cargarPostres();
};

const actualizarPostre = async (e) => {

  e.preventDefault();

  await fetch(`http://localhost:3000/postres/actualizar/${postreSeleccionado.id_postre}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  });

  setAlert("Postre actualizado correctamente");

  setEditando(false);

  setModalAgregar(false);

  cargarPostres();

};

const verPostre = (postre) => {

  setPostreSeleccionado(postre);

  setModalVer(true);

};

const editarPostre = (postre) => {

  setForm({
    nombre: postre.nombre,
    ingredientes: postre.ingredientes,
    instrucciones: postre.instrucciones,
    tiempo: postre.tiempo,
    calorias: postre.calorias,
    proteina: postre.proteina
  });

  setPostreSeleccionado(postre);

  setEditando(true);

  setModalAgregar(true);

};

const eliminar = async (id) => {

  await eliminarPostre(id);

  setAlert("Postre eliminado correctamente");

  cargarPostres();

};

return (

<div className="min-h-screen bg-green-300 flex justify-center">

<div className="bg-white w-full max-w-5xl p-8 rounded-xl shadow-lg mt-10">

<div className="flex justify-between items-center mb-6">

<h1 className="text-3xl font-bold text-green-600">
Postres Fit
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
Agregar postre
</button>

<Table
columns={["Nombre", "Calorias", "Proteina"]}
data={postres}
actions={(postre) => (

<div className="flex gap-2 justify-center">

<button
onClick={() => verPostre(postre)}
className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
>
Ver
</button>

<button
onClick={() => editarPostre(postre)}
className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
>
Editar
</button>

<button
onClick={() => eliminar(postre.id_postre)}
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
title="Nuevo postre fit"
>

<form onSubmit={editando ? actualizarPostre : handleSubmit} className="flex flex-col gap-3">

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
className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold"
>
Guardar postre
</button>

</form>

</Modal>

<Modal
isOpen={modalVer}
onClose={() => setModalVer(false)}
title="Detalles del postre"
>

{postreSeleccionado && (

<div className="flex flex-col gap-2">

<h2 className="text-xl font-bold">
{postreSeleccionado.nombre}
</h2>

<p>
<strong>Ingredientes:</strong> {postreSeleccionado.ingredientes}
</p>

<p>
<strong>Instrucciones:</strong> {postreSeleccionado.instrucciones}
</p>

<p>
<strong>Tiempo:</strong> {postreSeleccionado.tiempo} minutos
</p>

<p>
<strong>Calorias:</strong> {postreSeleccionado.calorias}
</p>

<p>
<strong>Proteina:</strong> {postreSeleccionado.proteina}
</p>

</div>

)}

</Modal>

</div>

</div>

);

}