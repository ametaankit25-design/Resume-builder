import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home'
import FormPage from './pages/formPage'
import Final from './pages/FinalPage'
import Temp from './pages/templates'
import LoginSignup from './pages/loginPage';
const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formPage" element={<FormPage />} />
          <Route path="/FinalPage" element={<Final />} />
          <Route path="/templates" element={<Temp />} />
          <Route path="/loginPage" element={<LoginSignup />} />
        </Routes>
    </div>
  )
}

export default App