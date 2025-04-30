// react memo for perofrmance optimization  where when user is in cart
// and then delete or change quanitty in car and then go back to menu
// then in menu we show the update  so normally whole menu re render 
// but using memo it check for each menu item whether it has props changed or a
//any change so it rerender only those menu item instaces that ar chnged
// so creating a performacne optimization
import React from "react";
import { formatCurrency } from "../../utilities/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCartItemById } from "../cart/cartSlice";
import UpdateItemQuantity from "../cart/UPdateItemQuantity";

function MenuItem({ pizza, className }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentItem = useSelector(selectCartItemById(id));

  const dispatch = useDispatch();

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li
      className={`flex gap-4 py-4 px-4 bg-white bg-opacity-20 rounded-xl shadow-lg hover:shadow-xl transition-all ${className} ${soldOut ? "opacity-80 grayscale" : ""
        }`}
    >
      <img
        src={imageUrl}
        alt={name}
        className="h-24 w-24 object-cover rounded-lg"
      />
      <div className="flex flex-col flex-grow">
        <p className="text-lg font-semibold text-gray-900">{name}</p>
        <div className="flex flex-wrap gap-2 text-xs text-gray-700 my-2">
          {ingredients.map((ing, i) => (
            <span
              key={i}
              className="bg-yellow-100 px-2 py-1 rounded-full"
            >
              {ing}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm text-gray-800">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-sm text-yellow-500 font-semibold uppercase">
              Sold out
            </p>
          )}
          <div className="flex items-center space-x-3">
            {currentItem && <UpdateItemQuantity pizza={currentItem} />}
            {!soldOut && <Button type='small' onClick={handleAddToCart} disabled={currentItem} className="transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110"
            > Add To cart </Button>
            }
          </div>
        </div>
      </div>
    </li>
  );
}
function areEqual(prevProps, nextProps) {
  return (
    prevProps.pizza.id === nextProps.pizza.id &&
    prevProps.pizza.name === nextProps.pizza.name &&
    prevProps.className === nextProps.className
  );
}

export default React.memo(MenuItem, areEqual);