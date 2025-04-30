import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./infrastructure/layout/AppLayout";
import { childRoutes } from "./infrastructure/routes/routes";
import Error from "./ui/Error";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute"; // adjust path accordingly


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
  return <RouterProvider router={router} />;
}

export default App;
