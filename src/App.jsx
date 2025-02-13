import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./infrastructure/layout/AppLayout";
import { childRoutes } from "./infrastructure/routes/routes";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: childRoutes,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
