import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GraphPage from './routes/GraphPage.tsx'
import ProfilePage from './routes/ProfilePage.tsx'
import ErrorPage from './routes/ErrorPage.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <GraphPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/profile/:region/:name/:tag',
        element: <ProfilePage />,
        errorElement: <ErrorPage />,
    },
])

export const AppRouter = () => {
    return <RouterProvider router={router} />
}
