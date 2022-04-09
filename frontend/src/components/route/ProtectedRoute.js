import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const ProtectedRoute = () => {
  let loggedinUser = localStorage.getItem('token')
  // const user = loggedinUser && jwt_decode( loggedinUser )
  const user = localStorage.getItem('user')
  const { isAuthenticated } = useSelector((state) => state.userReducer)
  // const { loggedIn } = useSelector((state) => state.profileReducer)
  if (user) {
    if (isAuthenticated === true || loggedinUser) return <Outlet />
    else return <Navigate to={'/login'} />
  } else return <Navigate to={'/login'} />
}
export default ProtectedRoute
