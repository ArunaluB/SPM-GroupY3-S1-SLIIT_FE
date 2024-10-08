import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Homepage from "./routes/homepage/HomePage";
import DashboardPage from "./routes/dashboardPage/DashboardPage";
import ChatPage from "./routes/chatPage/ChatPage";
import RootLayout from "./layout/rootLayout/RootLayout";
import DashboardLayout from "./layout/dashboardLayout/DashboardLayout";
import SignInPage from "./routes/signInPage/SignInPage";
import SignUpPage from "./routes/signUpPage/signUpPage";
import Home from "./components/Home/Home";
import Quiz from "./components/Quiz/Quiz";
import Result from "./components/Result/Result";
import BasePage from './pages/BasePage'; // Import the new BasePage component
import OutputPage from './components/codeMake/OutputPage'; // Import OutputPage component

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // Add the BasePage route
      {
        path: "/base",
        element: <BasePage />,
      },
      // Add the OutputPage route
      {
        path: "/output",
        element: <OutputPage />,
      },
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/sign-in/*",
        element: <SignInPage />,
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage />,
      },
      {
        path: "/quiz", 
        element: <Home />, 
      },
      {
        path: "/gotoquiz",
        element: <Quiz />,
      },
      {
        path: "/result",
        element: <Result />, 
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/dashboard/chats/:id",
            element: <ChatPage />,
          },
        ],
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
