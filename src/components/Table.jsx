export default function Table({ columns, data, actions }) {

return (

<div className="overflow-x-auto mt-6">

<table className="w-full bg-white rounded-xl shadow-md overflow-hidden">

<thead className="bg-green-500 text-white">

<tr>

{columns.map((col, index) => (
<th key={index} className="p-4 text-left font-semibold">
{col}
</th>
))}

{actions && (
<th className="p-4 text-center font-semibold">
Acciones
</th>
)}

</tr>

</thead>

<tbody>

{data.map((row, index) => (

<tr
key={row.id_receta || row.id_postre || index}
className="border-b hover:bg-green-50 transition text-gray-700"
>

<td className="p-4 font-medium">
{row.nombre}
</td>

<td className="p-4">
{row.calorias}
</td>

<td className="p-4">
{row.proteina}
</td>

{actions && (
<td className="p-4 text-center">
{actions(row)}
</td>
)}

</tr>

))}

</tbody>

</table>

</div>

);

}