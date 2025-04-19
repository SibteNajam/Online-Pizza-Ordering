import React from 'react'
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

function DeleteItem({ item }) {
    const dispatch = useDispatch();
    function handleDeleteItem(id) {
        dispatch(deleteItem(id));
    }
    return (
        <Button type='small' onClick={() => handleDeleteItem(item.pizzaId)}
        >Delete</Button>
    )
}

export default DeleteItem;
