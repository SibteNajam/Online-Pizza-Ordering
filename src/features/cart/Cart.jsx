// import LinkButton from "../../ui/LinkButton";
// import Button from "../../ui/Button";
// import CartItem from "./CartItem";
// import { useDispatch, useSelector } from "react-redux";
// import { getCart, clearCart } from "./cartSlice";
// import { getUserName } from "../user/userSlice";
// import EmptyCart from "./EmptyCart";
// import { formatCurrency } from "../../utilities/helpers";

// function Cart() {
//   const username = useSelector(getUserName);
//   const cart = useSelector(getCart);
//   const dispatch = useDispatch();

//   // Calculate total price of all cart items
//   const totalCartPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

//   function handleClearCart(e) {
//     e.preventDefault();
//     dispatch(clearCart());
//   }

//   if (!cart.length) return <EmptyCart />;

//   return (
//     <div className="min-h-screen p-4 pizza-bg relative">
//       <div className="crystal-container max-w-3xl mx-auto animate-fade-in">
//         <LinkButton
//           to="/menu"
//           className="text-yellow-500 hover:underline animate-slide-down"
//         >
//           ← Back to menu
//         </LinkButton>

//         <h2 className="mt-7 text-2xl md:text-3xl font-extrabold text-gray-900">
//           Your cart, {username}
//         </h2>

//         <ul className="space-y-4 border-b border-gray-300 mt-6 pb-4">
//           {cart.map((item, index) => (
//             <CartItem
//               item={item}
//               key={item.pizzaId}
//               className={`animate-slide-up`}
//               style={{ animationDelay: `${index * 0.1}s` }}
//             />
//           ))}
//           <li className="py-3">
//             <div className="total-card flex items-center justify-end gap-3 px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-yellow-500 border-opacity-50 hover:shadow-glow transition-all animate-pulse-in">
//               <span className="text-lg font-semibold gradient-text">Total 🍕</span>
//               <span className="text-lg font-bold text-gray-900">
//                 {formatCurrency(totalCartPrice)}
//               </span>
//             </div>
//           </li>
//         </ul>

//         <div className="mt-6 space-x-4 flex justify-end">
//           <Button
//             type="primary"
//             to="/order/add"
//             className="hover:scale-105 transition-transform"
//           >
//             Order Pizzas
//           </Button>
//           <Button
//             type="secondary"
//             onClick={handleClearCart}
//             className="hover:scale-105 transition-transform"
//           >
//             Clear Cart
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getCart, clearCart } from "./cartSlice";
import { getUserName } from "../user/userSlice";
import EmptyCart from "./EmptyCart";
import { formatCurrency } from "../../utilities/helpers";

function Cart() {
  const username = useSelector(getUserName);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  // Calculate total price of all cart items
  const totalCartPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  function handleClearCart(e) {
    e.preventDefault();
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="min-h-screen p-4 pizza-bg relative">
      <div className="crystal-container max-w-3xl mx-auto animate-fade-in">
        <LinkButton
          to="/menu"
          className="text-yellow-500 hover:underline animate-slide-down"
        >
          ← Back to menu
        </LinkButton>

        <h2 className="mt-7 text-2xl md:text-3xl font-extrabold text-gray-900">
          Your cart, {username}
        </h2>

        <ul className="space-y-4 border-b border-gray-300 mt-6 pb-4">
          {cart.map((item, index) => (
            <CartItem
              item={item}
              key={item.pizzaId}
              className={`animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
          <li className="py-3">
            <div
              className="flex items-center justify-end gap-3 px-4 py-3 bg-white/10 rounded-lg border border-yellow-500/50 hover:shadow-lg hover:scale-102 transition-all animate-pulse"
              style={{
                background: "rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(6px)",
              }}
            >
              <span
                className="text-lg font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text"
                style={{
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                Total 🍕
              </span>
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(totalCartPrice)}
              </span>
            </div>
          </li>
        </ul>

        <div className="mt-6 space-x-4 flex justify-end">
          <Button
            type="primary"
            to="/order/add"
            className="hover:scale-105 transition-transform"
          >
            Order Pizzas
          </Button>
          <Button
            type="secondary"
            onClick={handleClearCart}
            className="hover:scale-105 transition-transform"
          >
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;