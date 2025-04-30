import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username"
import { supabase } from "../../SupabaseClient"; // Make sure the path is correct
import { useNavigate } from "react-router-dom";
import Button from "./Button";
function Header() {
  const navigate = useNavigate();
  const signOut = async () => {

    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/login"); // redirect to login after sign out
    } else {
      console.error("Sign out error:", error.message);
    }
  };
  return (
    <>
      <header className="flex items-center justify-between bg-yellow-400 font-pizza uppercase px-3 py-4  sm:px-6 border-b border-stone-400">
        <div className="flex gap-4 items-center ">

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="36" height="36">
            <text y=".9em" fontSize="90">🍕</text>
          </svg>
          <Link to="/" className="uppercase tracking-[2px] ">Fast React Pizza</Link>
        </div>
        <SearchOrder />
        <div className="flex items-center gap-4">
          <Username />

          <Button type='small'
            onClick={signOut}

          >
            Sign Out
          </Button>
        </div>
      </header>
    </>
  );
}
export default Header;
