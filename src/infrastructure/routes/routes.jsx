// childRoutes.js

import Home from "../../ui/Home";
import Error from "../../ui/Error";
import Cart from "../../features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "../../features/order/CreateOrder";
import Order, { loader as orderLoader } from "../../features/order/Order";
import Menu, { loader as menuLoader } from "../../features/menu/Menu";
import Login from "../../auth/Login";

// Define and export the child routes
export const childRoutes = [
  { path: "/", element: <Home /> },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: "/menu",
    element: <Menu />,
    loader: menuLoader,
    errorElement: <Error />,
  },
  { path: "/cart", element: <Cart /> },
  {
    path: "/order/:orderID",
    element: <Order />,
    loader: orderLoader,
    errorElement: <Error />,
  },
  { path: "/order/add", element: <CreateOrder />, action: createOrderAction },
];
