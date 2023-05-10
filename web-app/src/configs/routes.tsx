import { RouteObject } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import ProfileSettings from '../pages/ProfileSettings';
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
                        path: 'settings',
                        element: <ProfileSettings />
                    }
                ]
            }
        ]
    },
]

export default routes;