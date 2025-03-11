import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Docters'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Myprofile from './pages/Myprofile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './pages/Appointment'




const App = () => {
  return (
    <div className='mx-4 sm:mx[10%]'>
      <navbar/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/docters' element={<Doctors/>}/>
    <Route path='/docters/:speciality' element={<Doctors/>}/>
   
    <Route path='/login' element={<Login/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
  </Routes>
  <Route path='/myprofile' element={<Myprofile/>}/>
  <Route path='/myAppointment' element={<MyAppointment/>}/>
  
  <Route path='/Appointment/:docId' element={<Appointment/>}/>

    </div>
  )
}

export default App

