/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { formatCurrency } from "../../utilities/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="py-4 px-6 sm:px-8 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-base text-gray-800 font-medium">
          <span className="font-bold text-gray-900">{quantity}×</span> {name}
        </p>
        <p className="text-base font-bold text-yellow-600">
          {formatCurrency(totalPrice)}
        </p>
      </div>
      {isLoadingIngredients ? (
        <p className="text-sm text-gray-500 mt-1">Loading ingredients...</p>
      ) : ingredients && (
        <p className="text-sm text-gray-500 mt-1 italic">
          {ingredients.join(", ")}
        </p>
      )}
    </motion.li>
  );
}

export default OrderItem;