import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'

function useAuth() {
    const authContext = useContext(AuthContext)
  return authContext
}

export default useAuth