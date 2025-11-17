import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { CssBaseline } from '@mui/material'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CssBaseline>
        <App />  
      </CssBaseline>
    </BrowserRouter> 
  </StrictMode>
)
