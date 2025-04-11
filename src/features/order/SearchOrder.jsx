import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery(""); // Clear the input after navigation
  }

  return (
    <form onSubmit={handleSubmit}>
    <input
  // className="border text-gray-900 border-stone-400 bg-white rounded-sm px-2 py-0.3
  //           focus:border-2 focus:border-stone-500  focus:outline-none !important"
  className="rounded-full bg-yellow-100 px-4 py-2 text-sm placeholder:text-stone-400 focus:w-72 sm:focus:w-64 border border-transparent focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 transition-all duration-300"
  placeholder="Search Order"
  value={query}
  onChange={(e) => { 
    setQuery(e.target.value);
  }} 
/>

    </form>
  );
}

export default SearchOrder;
