import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import ForgotPass from './ForgotPass';

export default function index() {
    return (

        <Routes>
            <Route path='/'>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='forgot-password' element={<ForgotPass />} />
            </Route>
        </Routes>
    )
}
