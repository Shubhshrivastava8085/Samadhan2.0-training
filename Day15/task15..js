import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <nav>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/" element={<div>Welcome! Go to <Link to="/dashboard">Dashboard</Link> (protected)</div>} />
      </Routes>
    </div>
  )
}
import React from 'react'
import { Navigate } from 'react-router-dom'
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace />
  return children
}
import React, { useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()
  async function submit(e) {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      alert(err.response?.data?.message || 'Error')
    }
  }
  return (
    <form onSubmit={submit} style={{ maxWidth: 400 }}>
      <h2>Register</h2>
      <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
      <button type="submit">Register</button>
    </form>
  )
}
import React, { useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  async function submit(e) {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      alert(err.response?.data?.message || 'Error')
    }
  }
  return (
    <form onSubmit={submit} style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
      <button type="submit">Login</button>
    </form>
  )
}
import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
export default function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/auth/me')
        setUser(res.data.user)
      } catch (err) {
        console.error(err)
      }
    }
    load()
  }, [])
  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div>
      <h2>Dashboard</h2>
      {user ? <div>Welcome, {user.name}</div> : <div>Loading...</div>}
      <button onClick={logout}>Logout</button>
    </div>
  )
}
