import React from 'react'
import Navbar from './Components/Navbar'
import Main from './Components/Main'
import View from './Components/View'
import { Route, Routes } from 'react-router-dom'


function App() {
  return (
    <>
    <Navbar />
     <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path="/viewnoteslink" element={<View />}/>
      </Routes> 
    </>
  )
}

export default App