import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GraphPage from './app/routes/graphPage.tsx'
import ProfilePage from './app/routes/profilePage.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <GraphPage />,
    },
    {
        path: '/profile/:name/:tag',
        element: <ProfilePage />,
    },
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
