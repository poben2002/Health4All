import { useState } from 'react'
import './App.css'
import  Home  from './frontend/Home'
import  Map  from './frontend/Map'
import  About  from './frontend/About'
import  Resources  from './frontend/Resources'
import { HashRouter, Routes, Route } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/Map" element={<Map/>}/>
          <Route path="/Resources" element={<Resources/>}/>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
