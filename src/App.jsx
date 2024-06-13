import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./components/Home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ListPage from "./components/List/ListPage";
import Layout from "./components/Layout/Layout";
import PropDetails from "./components/PropDetails/PropDetails";
import Main from "./components/ProfilePage/Main";

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
        },
        { path: "/list/1", element: <PropDetails /> },
        { path: "/1/profile", element: <Main /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
