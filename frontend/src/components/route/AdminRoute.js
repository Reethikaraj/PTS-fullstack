import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.userReducer)
  if (isAuthenticated === true && user.role === 'admin') return <Outlet />
  else return <Navigate to={'/login'} />
}
export default AdminRoute
