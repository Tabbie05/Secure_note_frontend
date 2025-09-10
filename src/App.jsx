import React from 'react'
import Navbar from './Components/Navbar'
import View from './Components/View'
import { Route, Routes, useParams } from 'react-router-dom'
import NoteForm from './Components/NoteForm'
import NoteView from './Components/NoteView'
import AuthSuccess from './Components/AuthSuccess'


function App() {
  return (
    <>
    <Navbar />
     <Routes>
      <Route path='/' element={<NoteForm/>}/>
      <Route path="/viewnoteslink" element={<View />}/>
      <Route path="/auth-success" element={<AuthSuccess />}/>
      <Route path='/:id' element={<NoteView />}/>
      </Routes> 
    </>
  )
}

export default App 