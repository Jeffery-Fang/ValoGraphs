import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { default as GraphPage } from './app/routes/graph.tsx'
import { default as ProfilePage } from './app/routes/profile.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <GraphPage />,
    },
    {
        path: '/profile',
        element: <ProfilePage />,
    },
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
