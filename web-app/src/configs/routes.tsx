import { RouteObject } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Questions from '../pages/Questions';

const routes: RouteObject[] = [
    {
        path: '',
        element: <Layout />,
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
                path: 'questions',
                element: <Questions />
            }
        ]
    },
]

export default routes;