import { Navigate, Outlet } from "react-router-dom"

function PrivateRoutes() {
  const user = localStorage.getItem("token") ? true : false

  return user ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes
