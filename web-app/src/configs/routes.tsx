import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '../components/Layout';
const Home = lazy(() => import('../pages/Home'));
const Questions = lazy(() => import('../pages/Questions'));
const SignUp = lazy(() => import('../pages/SignUp'));
const SignIn = lazy(() => import('../pages/SignIn'));
const ProfileSettings = lazy(() => import('../pages/ProfileSettings'));
const Profile = lazy(() => import('../pages/Profile'));
const RequireAuth = lazy(() => import('./RequireAuth'));

const routes: RouteObject[] = [
    {
        path: '',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'login',
                element: <SignIn />
            },
            {
                path: 'register',
                element: <SignUp />
            },
            {
                path: 'profile',
                children: [
                    {
                        index: true,
                        element: <RequireAuth><Profile /></RequireAuth>
                    },
                    {
                        path: 'settings',
                        element: <RequireAuth><ProfileSettings /></RequireAuth>
                    }
                ]

            },
            {
                path: 'questions',
                element: <Questions />
            }
        ]
    },
]

export default routes;