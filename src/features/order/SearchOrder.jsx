// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function SearchOrder() {
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!query) return;
//     navigate(`/order/${query}`);
//     setQuery(""); // Clear the input after navigation
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//     <input

//   className="rounded-full bg-yellow-100 px-4 py-2 text-sm placeholder:text-stone-400 focus:w-72 sm:focus:w-64 border border-transparent focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 transition-all duration-300"
//   placeholder="Search Order"
//   value={query}
//   onChange={(e) => { 
//     setQuery(e.target.value);
//   }} 
// />

//     </form>
//   );
// }

// export default SearchOrder;
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <motion.form
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="relative flex items-center"
    >
      <input
        className="w-32 sm:w-40 md:w-48 bg-white text-gray-800 text-xs sm:text-sm placeholder-gray-400 px-3 sm:px-4 py-1.5 sm:py-2 pr-8 sm:pr-10 rounded-lg border border-yellow-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-300 shadow-sm"
        placeholder="Search Order"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute right-2 sm:right-3 text-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </motion.span>
    </motion.form>
  );
}

export default SearchOrder;