// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { formatCurrency } from "../../utilities/helpers";
// import Button from "../../ui/Button";
// import { useDispatch, useSelector } from "react-redux";
// import { addItem, getCart } from "../cart/cartSlice";
// import UpdateItemQuantity from "../cart/UPdateItemQuantity";
// function MenuItem({ pizza }) {
//   const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
//   const cart = useSelector(getCart);
//   const currentItem = cart.find((item) => item.pizzaId === id);
//   const dispatch = useDispatch();

//   function handleAddToCart() {
//     const newItem = {
//       pizzaId: id,
//       name,
//       quantity: 1,
//       unitPrice,
//       totalPrice: unitPrice * 1,
//     };
//     dispatch(addItem(newItem));
//   };

//   return (
//     <li className="flex gap-7 py-2">
//       <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-90 grayscale-80' : ''}`} />
//       <div className="flex flex-col grow pt-0.5">
//         <p className="font-medium ">{name}</p>
//         {/* <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(", ")}</p> */}
//         <div className="flex flex-wrap gap-1 text-sm text-gray-600">
//           {ingredients.map((ing, i) => (
//             <span key={i} className="bg-stone-100 px-1.5 py-0.5 rounded">
//               {ing}
//             </span>
//           ))}
//         </div>

//         <div className="mt-auto flex items-center justify-between">
//           {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm text-yellow-500 uppercase font-medium">Sold out</p>}
//           <div className="flex items-center space-x-3">
//             {currentItem && (
//               <UpdateItemQuantity pizza={currentItem} />
//             )}
//             {!soldOut && <Button type='small' onClick={handleAddToCart} disabled={currentItem} className="transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110"
//             > Add To cart </Button>
//             }
//           </div>
//         </div>
//       </div>
//     </li>
//   );
// }

// export default MenuItem;
import { formatCurrency } from "../../utilities/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCart } from "../cart/cartSlice";
import UpdateItemQuantity from "../cart/UPdateItemQuantity";

function MenuItem({ pizza, className }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const cart = useSelector(getCart);
  const currentItem = cart.find((item) => item.pizzaId === id);
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

export default MenuItem;