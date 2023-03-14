import { Outlet, RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
const routes: RouteObject[] = [
    {
        path: '',
<<<<<<< HEAD:web-app/src/config/routes.tsx
        element:  <Outlet />,
=======
        element: <><Outlet /></>,
>>>>>>> 0bc2cc0 (#02 - setup theme and Input text):web-app/src/configs/routes.tsx
        children: [
            {
                //index: true,
                path: 'home',
                element: <Home />
            }
        ]
    },
    {
        path: 'login',
        element: <>login</>
    }
]

export default routes;