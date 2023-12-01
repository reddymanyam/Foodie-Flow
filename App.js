import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./Components/Footer";
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/contact";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"; 

       

// AppLayout component to render: Header, Outlet(it contain children component like body, About, Restaurant Menu etc) and Footer Component
const AppLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

// call createBrowserRouter for routing different pages
const appRouter = createBrowserRouter([
  {
    path: "/", // show path for routing
    element: <AppLayout />, // show component for particular path
    errorElement: <Error />, // show error component for path is different
    children: [
      // show children component for routing
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path:"/contact",
        element:<Contact />
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      
    ],
  },
 
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />); // render RouterProvider and use router as props and pass value appRouter