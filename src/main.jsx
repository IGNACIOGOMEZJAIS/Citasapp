import React from 'react'
import ReactDOM from 'react-dom/client'
import {CitasApp} from './CitasApp.jsx'
import './styles.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <CitasApp />
    </BrowserRouter>
  </React.StrictMode>,
)
