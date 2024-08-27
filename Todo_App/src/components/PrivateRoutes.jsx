import { useAuthContext } from 'context/AuthContext'
import Login from 'pages/Authentication/Login'
import React from 'react'

export default function PrivateRoutes(props) {

    const { isAuthenticated } = useAuthContext()

    const { Component } = props

    if (!isAuthenticated) {
        return <Login />
    }
    return (
        <Component />
    )
}
