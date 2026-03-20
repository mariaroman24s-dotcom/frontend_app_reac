import { Routes, Route } from "react-router-dom"

import Login from "../pages/Login"
import Registro from "../pages/Registro";
import Menu from "../pages/Menu"
import Recetas from "../pages/Recetas"
import Postres from "../pages/Postres"

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/recetas" element={<Recetas />} />
      <Route path="/postres" element={<Postres />} />
    </Routes>
  )
}

export default AppRouter