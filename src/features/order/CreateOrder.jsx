import { useState } from "react";
import { Form, redirect, useNavigation, useActionData } from "react-router-dom";
import Button from "../../ui/Button"
import { useSelector } from "react-redux";
import { clearCart, getCart } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { createOrder } from "../../services/apiRestaurant";
import store from "../../store";
import { useDispatch } from "react-redux";
import { fetchAddress } from "../user/userSlice";
import { supabase } from "../../../SupabaseClient";


// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );
console.log(isValidPhone);

function CreateOrder() {
  const dispatch = useDispatch();
  const username = useSelector(state => state.user.username);
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // return some errors so mostly used this hook
  const formError = useActionData();
  const position = useSelector((state) => state.user.position);
  const address = useSelector((state) => state.user.address);

  console.log("positioncocosle", position);
  // fetching cart from redux using use selector

  const cart = useSelector(getCart);
  // console.log(cart);
  if (!cart.length) return <EmptyCart />

  return (
    <div className="min-h-screen p-4 relative">
      {/* Top gradient border */}
      <div
        className="max-w-2xl mx-auto bg-white/20 border border-white/50 rounded-xl p-6 shadow-lg backdrop-blur-md animate-fade-in relative z-20"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <span className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full z-10" />

        {/* Bottom gradient border */}
        <span className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full z-10" />
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 text-center relative">
          Ready to order? Lets go! 🍕
        </h2>

        <button
          onClick={() => dispatch(fetchAddress())}
          className="mb-6 bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600 hover:scale-105 transition-all animate-pulse cursor-Pointer"
        >
          Get Position
        </button>

        <Form method="POST" className="space-y-6">
          {/* First Name */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <label className="sm:basis-40 text-gray-800 font-medium">First Name</label>
            <input
              className="grow px-4 py-2 bg-white/10 border border-gray-300/50 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
              type="text"
              name="customer"
              placeholder="Enter your name"
              defaultValue={username}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <label className="sm:basis-40 text-gray-800 font-medium">Phone number</label>
            <div className="grow">
              <input
                className="w-full px-4 py-2 bg-white/10 border border-gray-300/50 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                type="tel"
                name="phone"
                placeholder="Enter your Phone Number"
                required
              />
              {formError?.phone && (
                <p className="text-xs mt-2 text-yellow-600 bg-yellow-100/20 border border-yellow-500/50 p-2 rounded-lg">
                  {formError.phone}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <label className="sm:basis-40 text-gray-800 font-medium">Address</label>
            <div className="grow">
              <input
                className="w-full px-4 py-2 bg-white/10 border border-gray-300/50 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                type="text"
                name="address"
                placeholder="Enter your Address"
                required
                defaultValue={address}
              />
            </div>
          </div>

          {/* Priority Checkbox */}
          <div className="flex items-center justify-end gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <input
              className="h-6 w-6 accent-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-offset-2 rounded-md animate-pulse"
              type="checkbox"
              name="priority"
              id="priority"
              checked={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
            <label htmlFor="priority" className="text-gray-800 font-medium hover:text-yellow-500 transition-colors">
              Want to give your order priority?
            </label>
          </div>

          {/* Submit Button */}
          <div className="text-right animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            <Button
              type="primary"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-semibold px-6 py-2 rounded-lg hover:scale-105 hover:shadow-lg transition-all animate-bounce"
            >
              {isSubmitting ? "Placing Order..." : "Order Now"}
            </Button>
          </div>
          <input
            type="hidden"
            name="position"
            value={`${position.latitude}, ${position.longitude}`}
          />


        </Form>
      </div>
    </div>

  );
}
// to connect thsi action function we modify where we we define routes
export async function action({ request }) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    // Handle unauthenticated state
    throw new Error("User not authenticated");
  }
  const user_id = user?.id;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  // creating order by setting cart string to object
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
    position: data.position,
    user_id,
  };
  console.log("order", order);
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give correct phone nnumber.We might need to conatct you";
  if (Object.keys(errors).length > 0) return errors;
  console.log("total order check", order);
  // now we  can pass this data to api end point
  const newOrder = await createOrder(order);
  // after creting order we want use to move to URL /order/id to show order but we
  // cannot use navigate from useNavigate  we cannot use hook in this function
  //  hooks called in component only



  // dont overuse this direct approach
  store.dispatch(clearCart());
  // console.log("neworder", newOrder);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
