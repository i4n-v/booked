import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import NotFound from "../pages/NotFound";
import Chat from "../pages/Chat";
import Solicitations from "../pages/Books/Solicitations";
const Home = lazy(() => import("../pages/Home"));
const Acquisitions = lazy(() => import("../pages/Books/Acquisitions"));
const BooksExplore = lazy(() => import("../pages/Books/Explore"));
const Wish = lazy(() => import("../pages/Books/Wish"));
const BookViewContent = lazy(() => import("../pages/Books/View/Content"));
const BooksView = lazy(() => import("../pages/Books/View"));
const Questions = lazy(() => import("../pages/Questions"));
const SignUp = lazy(() => import("../pages/SignUp"));
const SignIn = lazy(() => import("../pages/SignIn"));
const ProfileSettings = lazy(() => import("../pages/Profile/Settings"));
const Profile = lazy(() => import("../pages/Profile"));
const RequireAuth = lazy(() => import("./RequireAuth"));

const routes: RouteObject[] = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "register",
        element: <SignUp />,
      },
      {
        path: "wishes",
        element: <Wish />,
      },
      {
        path: "profile",
        children: [
          {
            index: true,
            element: (
              <RequireAuth>
                <Profile />
              </RequireAuth>
            ),
          },
          {
            path: "settings",
            element: (
              <RequireAuth>
                <ProfileSettings />
              </RequireAuth>
            ),
          },
        ],
      },
      {
        path: "explore",
        children: [
          {
            index: true,
            element: <BooksExplore />,
          },
          {
            path: ":bookId",
            children: [
              {
                index: true,
                element: <BooksView />,
              },
              {
                path: "content",
                element: <BookViewContent />,
              },
            ],
          },
        ],
      },
      {
        path: "questions",
        element: <Questions />,
      },
      {
        path: "chat",
        element: (
          <RequireAuth>
            <Chat />
          </RequireAuth>
        ),
      },
      {
        path: "solicitations",
        element: (
          <RequireAuth>
            <Solicitations />
          </RequireAuth>
        ),
      },
      {
        path: "acquisitions",
        element: <Acquisitions />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
