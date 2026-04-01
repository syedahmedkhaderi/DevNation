import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AdminProvider } from './context/AdminContext'
import { DataProvider } from './context/DataContext'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <DataProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1a1a17',
                color: '#e8e4dd',
                border: '1px solid rgba(226,106,27,0.2)',
                borderRadius: '6px',
                fontFamily: 'DM Sans, system-ui, sans-serif',
                fontSize: '14px',
              },
            }}
          />
        </DataProvider>
      </AdminProvider>
    </BrowserRouter>
  </React.StrictMode>
)
