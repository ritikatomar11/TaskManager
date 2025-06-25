import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Protected from './pages/Protected.jsx'
import Login from './pages/Login.jsx'
import MainPage from './pages/MainPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AllTask from './pages/AllTask.jsx'
import UpdateTask from './pages/UpdateTask.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Protected><Dashboard/></Protected>}/>
        <Route path="/allTasks" element={<Protected><AllTask/></Protected>}/>
        <Route path="/updateStatus" element={<UpdateTask/>}/>

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
