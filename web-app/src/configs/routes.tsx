import { RouteObject } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Questions from '../pages/Questions';

import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
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
                path: 'questions',
                element: <Questions />
            }
        ]
    },
]

export default routes;