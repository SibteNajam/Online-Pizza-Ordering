import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { increaseItemQuantity, decreaseItemQuantity } from "./cartSlice";

const UpdateItemQuantity = ({ pizza }) => {
    const dispatch = useDispatch();
    function handleIncreaseQuantity() {
        dispatch(increaseItemQuantity(pizza.pizzaId));
    };
    function handleDecreaseQuantity() {
        dispatch(decreaseItemQuantity(pizza.pizzaId));
    };
    return (
        <div className="flex gap-1 items-center md:gap-3">
            <Button
                type='round' onClick={handleDecreaseQuantity}>
                -
            </Button>
            <p className="text-sm">{pizza.quantity}</p>
            <Button
                type='round' onClick={handleIncreaseQuantity}>+</Button>

        </div>
    )
}

export default UpdateItemQuantity;
