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
  className="border text-gray-900 border-stone-400 bg-white rounded-sm px-2 py-0.3
            focus:border-2 focus:border-stone-500  focus:outline-none !important"
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
