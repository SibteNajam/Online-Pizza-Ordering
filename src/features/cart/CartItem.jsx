/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utilities/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UPdateItemQuantity";

function CartItem({ item, className }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li
      className={`py-3 px-4 bg-white bg-opacity-20 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}
    >
      <p className="text-gray-900 text-sm font-semibold">
        {quantity}× {name}
      </p>
      <div className="flex items-center justify-between sm:gap-3">
        <p className="text-sm font-bold text-gray-900">
          {formatCurrency(totalPrice)}
        </p>
        <div className="flex items-center gap-2">
          <UpdateItemQuantity pizza={item} />
          <DeleteItem item={item} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;