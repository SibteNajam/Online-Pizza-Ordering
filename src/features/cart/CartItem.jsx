/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utilities/helpers";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import DeleteItem from "./DeleteItem";

import { deleteItem } from "./cartSlice";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  function handleDeleteItem(id) {
    dispatch(deleteItem(id));
  }
  return (
    <li className="py-3 sm:flex sm:items-center justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <DeleteItem item={item} />
      </div>
    </li>
  );
}

export default CartItem;
