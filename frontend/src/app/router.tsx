import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GraphPage from './routes/GraphPage'
import ProfilePage from './routes/ProfilePage'
import ErrorPage from './routes/ErrorPage'

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
