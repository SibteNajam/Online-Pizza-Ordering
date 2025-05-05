import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./infrastructure/layout/AppLayout";
import { childRoutes } from "./infrastructure/routes/routes";
import Error from "./ui/Error";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute"; // adjust 
// path accordingly
import "./main.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />, // No layout
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: childRoutes,
  },
]);
function App() {
  return <RouterProvider router={router} future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}
  />;
}

export default App;
