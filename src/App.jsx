import Home from "./components/Home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ListPage from "./components/List/ListPage";
import { Layout, RequireAuth } from "./components/Layout/Layout";
import PropDetails from "./components/PropDetails/PropDetails";
import Main from "./components/ProfilePage/Main";
import UserLogin from "./components/Login/Login";
import { ContextProvider } from "./utils/Context";
import UpdateProfile from "./components/ProfilePage/UpdateProfile";
import NewPost from "./components/newPostPage/NewPost.jsx";
import { listLoader, singlePageLoader } from "../lib/loaders.js";
import LoadingSpinner from "./utils/LoadingSpinner.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Agents from "./components/Agents/Agents.jsx";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listLoader,
        },
        {
          path: "/details/:id",
          element: <PropDetails />,
          loader: singlePageLoader,
        },
        { path: "/signin", element: <UserLogin /> },
        { path: "/about", element: <About /> },
        { path: "/agents", element: <Agents /> },
        { path: "/contact", element: <Contact /> },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <Main />,
        },
        {
          path: "/profile/update",
          element: <UpdateProfile />,
        },
        {
          path: "/add",
          element: <NewPost />,
        },
      ],
    },
  ]);

  return (
    <>
      <ContextProvider>
        <RouterProvider
          router={route}
          fallbackElement={<LoadingSpinner asOverlay />}
        />
      </ContextProvider>
    </>
  );
}

export default App;
