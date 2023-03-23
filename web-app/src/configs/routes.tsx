import { RouteObject } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
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
        ]
    },
]

export default routes;