import React from 'react'
import { useAuth } from '../context/AuthContext'

export const HomeDas = () => {

  const {user} = useAuth();
  console.log(user)

  return (
    <h1>Bienvenido {user.user.rol} : {user.user.email}</h1>
  )
}
