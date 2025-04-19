import { useNavigate } from "react-router-dom";
import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";
import Button from "./Button"
function Home() {
  const username = useSelector(state => state.user.username);
  const navigate = useNavigate();
  return (
    <div className="my-10 sm:my-16 px-4 text-center  ">
      <h1 className="mb-8 text-xl md:text-3xl text-stone-700 font-semibold text-center">
        The best pizza.
        <br />
      <span className="text-yellow-500">Straight out of the oven, straight to you.</span>
      </h1>
        {!username ? <CreateUser/>: <Button to='/menu' type="primary">Continue Ordering, {username}</Button>}
    </div>
  );
}
 
export default Home;
