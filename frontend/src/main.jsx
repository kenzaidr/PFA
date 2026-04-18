import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeLangProvider } from './contexts/ThemeLangContext.jsx'
import { router } from './router/index.jsx'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeLangProvider>
      <RouterProvider router={router} />
    </ThemeLangProvider>
  </React.StrictMode>,
)
