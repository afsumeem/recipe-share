import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AddRecipes from "./pages/AddRecipes.jsx";
import AllRecipes from "./pages/AllRecipes.jsx";
import Layout from "./components/Layout/Layout.jsx";
import PrivateRoute from "./privateRoute/PrivateRoute.jsx";
import RecipeDetail from "./pages/RecipeDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/recipes",
        loader: () => fetch("http://localhost:5000/recipes"),
        element: <AllRecipes />,
      },
      {
        path: "/add-recipes",
        element: (
          <PrivateRoute>
            <AddRecipes />
          </PrivateRoute>
        ),
      },
      {
        path: "/recipe-detail/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/recipes/${params.id}`),
        element: (
          <PrivateRoute>
            <RecipeDetail />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
