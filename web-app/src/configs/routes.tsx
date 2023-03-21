import { RouteObject } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import SignUp from '../pages/Signup';
const routes: RouteObject[] = [
    {
        path: '',
        element: <Layout/>,
        children: [
            {
                //index: true,
                path: 'home',
                element: <Home />
            },
            {
                path: 'login',
                element: <>login</>
            },
            {
                path: 'register',
                element: <SignUp />
            }
        ]
    },
]

export default routes;