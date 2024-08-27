import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Footer from './components/Footer'
import Header from './components/Header'
import About from './components/About';
import ContactUs from './components/ContactUs';
import Todo from './ShowTodo'

export default function index() {
  return (
    <>

      <Header />
      <main>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='todo' element={<Todo />} />
            <Route path='contact' element={<ContactUs />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  )
}
