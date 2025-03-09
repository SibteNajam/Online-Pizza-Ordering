import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username"

function Header() {
  return (
    <>
      <header className="flex items-center justify-between bg-yellow-400 uppercase px-3 py-4  sm:px-6 border-b border-stone-400">
        <Link to="/" className="uppercase tracking-[2px] font-extrabold">Fast React Pizza</Link>
        <SearchOrder />
        <Username/>
      </header>
    </>
  );
}
export default Header;
