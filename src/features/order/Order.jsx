

import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import { getOrder } from "../../services/apiRestaurant";
import { formatCurrency, formatDate, calcMinutesLeft } from "../../utilities/helpers";
import OrderItem from "./OrderItem";

function Order() {
  const order = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="bg-yellow-400 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <motion.h2
              initial={{ x: -30 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-extrabold text-gray-900"
            >
              Order #{id}
            </motion.h2>
            <div className="flex gap-3">
              {priority && (
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-red-500 rounded-full py-2 px-4 text-sm font-bold text-white uppercase tracking-wider shadow-sm"
                >
                  Priority
                </motion.span>
              )}
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-yellow-600 rounded-full py-2 px-4 text-sm font-bold text-white uppercase tracking-wider shadow-sm"
              >
                {status}
              </motion.span>
            </div>
          </div>
        </div>

        {/* Delivery Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-6 sm:p-8 bg-gray-50"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xl font-semibold text-gray-800">
              {deliveryIn >= 0
                ? `Arriving in ${deliveryIn} minutes! 🎉`
                : "Your order should be with you! 📦"}
            </p>
            <p className="text-sm text-gray-500 font-medium">
              Estimated Delivery: {formatDate(estimatedDelivery)}
            </p>
          </div>
          {/* Progress Bar */}
          {deliveryIn >= 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="mt-6"
            >
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((60 - deliveryIn) / 60 * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                Delivery Progress: {Math.round((60 - deliveryIn) / 60 * 100)}%
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Order Items */}
        <ul className="divide-y divide-gray-100">
          {cart.map((item) => (
            <motion.li
              key={item.pizzaId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * (item.pizzaId % 5) }}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <OrderItem
                item={item}
              // or however you manage this
              />
            </motion.li>
          ))}
        </ul>

        {/* Pricing Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="p-6 sm:p-8 bg-gray-50 border-t border-gray-100"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-base font-medium text-gray-600">Order Price:</p>
              <p className="text-base font-semibold text-gray-800">{formatCurrency(totalCartPrice)}</p>
            </div>
            {priority && (
              <div className="flex justify-between items-center">
                <p className="text-base font-medium text-gray-600">Priority Fee:</p>
                <p className="text-base font-semibold text-gray-800">{formatCurrency(priorityPrice)}</p>
              </div>
            )}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <p className="text-lg font-bold text-gray-900">To Pay on Delivery:</p>
              <p className="text-lg font-bold text-yellow-600">{formatCurrency(orderPrice + priorityPrice)}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderID);
  return order;
}

export default Order;





