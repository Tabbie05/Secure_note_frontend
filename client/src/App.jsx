import React from 'react'
import Navbar from './Components/Navbar'
import View from './Components/View'
import { Route, Routes } from 'react-router-dom'
import NoteForm from './Components/NoteForm'


function App() {
  return (
    <>
    <Navbar />
     <Routes>
      <Route path='/' element={<NoteForm/>}/>
      <Route path="/viewnoteslink" element={<View />}/>
      </Routes> 
    </>
  )
}

export default App