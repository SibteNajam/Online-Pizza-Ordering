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

  // fetching cart from redux using use selector

  const cart = useSelector(getCart);
  // console.log(cart);
  if (!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">{"Ready to order? Let's go!"}</h2>
      <button onClick={() => dispatch(fetchAddress())}>Get Position</button>
      {/* <Form method="POST" action="/order/add "> */}
      <Form method="POST">
        <div className="mb-3 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" placeholder="Enter your name" defaultValue={username} required />
        </div>

        <div className="mb-3 flex gap-2 flex-col sm:flex-row sm:items-start">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" placeholder="Enter your Phone NUmber" required />
            {formError?.phone && <p className="text-xs mt-2 text-yellow-600 bg-yellow-100 p-2 rounded-[7px]">{formError.phone}</p>}
          </div>
        </div>

        <div className="mb-3 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="block text-gray-700 sm:basis-40">Address</label>
          <div className="grow">
            <input
              placeholder="Enter your Address"
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex gap-5 items-center justify-end">
          <input
            className="h-6 w-6 accent-yellow-300 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          {/* here i add cart as an input or as form elemenet but its not on ui for now thats why its hidden */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type='primary' disabled={isSubmitting}>
            {isSubmitting ? "Placing Order..." : "Order Now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
// to connect thsi action function we modify where we we define routes
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  // creating order by setting cart string to object
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };
  console.log("order", order);
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give correct phone nnumber.We might need to conatct you";
  if (Object.keys(errors).length > 0) return errors;

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
