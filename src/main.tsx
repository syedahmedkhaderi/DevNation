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
                background: '#1e1b4b',
                color: '#fff',
                border: '1px solid rgba(99,102,241,0.3)',
              },
            }}
          />
        </DataProvider>
      </AdminProvider>
    </BrowserRouter>
  </React.StrictMode>
)
