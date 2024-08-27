import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoutes from '../components/PrivateRoutes.jsx'
import { useAuthContext } from 'context/AuthContext'
import { Navigate } from '../../node_modules/react-router-dom/dist/index'
import Frontend from './Frontend'
import Dashboard from './Dashboard'
import Authentication from './Authentication'

export default function Index() {
    const { isAuthenticated } = useAuthContext()

    // console.log("isAuthenticated from useContext : ", isAuthenticated);
    // console.log("User from useContext : ", user.user);

    return (
        <>
            <Routes>
                <Route path='/*' element={<Frontend />} />
                <Route path='authentication/*' element={!isAuthenticated ? <Authentication /> : <Navigate to="/dashboard" />} />
                <Route path='dashboard/*' element={<PrivateRoutes Component={Dashboard} />} />
            </Routes>
        </>
    )
}



