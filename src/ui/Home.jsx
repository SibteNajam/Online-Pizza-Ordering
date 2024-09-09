import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>
        The best pizza.
        <br />
        Straight out of the oven, straight to you.
      </h1>
      <Button onClick={() => navigate("/menu")}>Click to Menu</Button>
    </div>
  );
}

export default Home;
