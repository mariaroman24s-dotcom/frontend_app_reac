import { useNavigate } from "react-router-dom"

export default function Menu() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-300">

      <div className="bg-white p-10 rounded-2xl shadow-lg text-center w-[620px]">

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Recetario Fit
        </h1>

        <p className="text-gray-600 mb-8">
          Este es tu espacio para crear, experimentar y descubrir nuevas recetas. 
          Aquí puedes dejar volar tu imaginación y preparar platillos deliciosos y saludables que te ayuden a construir un 
          estilo de vida más equilibrado. Cada receta es un paso más hacia tus metas y hacia una mejor versión de ti. 
        </p>

        <div className="flex flex-col gap-4">

          <button
            onClick={() => navigate("/recetas")}
            className="bg-green-500 hover:bg-green-600 text-white w-full p-3 rounded-lg font-semibold transition"
          >
            Comidas Fit
          </button>

          <button
            onClick={() => navigate("/postres")}
            className="bg-green-500 hover:bg-green-600 text-white w-full p-3 rounded-lg font-semibold transition"
          >
            Postres Fit
          </button>

        </div>

      </div>

    </div>
  )
}