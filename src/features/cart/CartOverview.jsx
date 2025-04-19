import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import Button from "../../ui/Button";
function CartOverview() {
  const totalCartPrice = useSelector(getTotalCartPrice);
  const totalCartQunatity = useSelector(getTotalCartQuantity);
  if (!totalCartQunatity) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 text-stone-200 uppercase py-4 px-10 sm:space-y-2 text-sm md:text-base">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <span className="capitalize">Quantity-{totalCartQunatity}</span>
        <span className="capitalize">price-${totalCartPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
