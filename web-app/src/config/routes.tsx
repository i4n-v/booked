import { Outlet, RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
const routes: RouteObject[] = [
    {
        path: '',
        element: <>Layout <Outlet /></>,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
]

export default routes;