import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import VerifyEmail from './pages/VerifyEmail'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <Router>
      <>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>} />
        </Routes>
      </>
    </Router>
  )
}

export default App