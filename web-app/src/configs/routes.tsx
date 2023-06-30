    import { lazy } from 'react';
    import { RouteObject } from 'react-router-dom';
    import Layout from '../components/Layout';
    import BooksExplore from '../pages/Books/Explore';
    import NotFound from '../pages/NotFound';
    const Home = lazy(() => import('../pages/Home'));
    const BooksView = lazy(() => import('../pages/Books/View'));
    const Questions = lazy(() => import('../pages/Questions'));
    const SignUp = lazy(() => import('../pages/SignUp'));
    const SignIn = lazy(() => import('../pages/SignIn'));
    const ProfileSettings = lazy(() => import('../pages/Profile/Settings'));
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
                    path: 'explore',
                    children: [
                        {
                            index: true,
                            element: <BooksExplore />,
                        },
                        {
                            path: ':bookId',
                            element: <BooksView />,
                        }
                    ]
                },
                {
                    path: 'questions',
                    element: <Questions />
                },
                {
                    path: '*',
                    element: <NotFound />
                }
            ]
        },
    ]

    export default routes;