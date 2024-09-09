import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./infrastructure/layout/AppLayout";
import { childRoutes } from "./infrastructure/routes/routes";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: childRoutes,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
