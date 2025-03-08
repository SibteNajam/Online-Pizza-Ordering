import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-xl text-yellow-500 font-semibold">
        The best pizza.
        <br />
        Straight out of the oven, straight to you.
      </h1>
      <Button
        onClick={() => navigate("/menu")}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue"
      >
        Click to Menu
      </Button>
    </div>
  );
}

export default Home;
