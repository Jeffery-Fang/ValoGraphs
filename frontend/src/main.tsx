import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { AppRouter } from './app/router'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppRouter />
    </StrictMode>
)
