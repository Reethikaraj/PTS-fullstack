import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.userReducer)
  if (isAuthenticated === true) return <Outlet />
  else return <Navigate to={'/login'} />
}

export default ProtectedRoute
