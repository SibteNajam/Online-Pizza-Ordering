
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../../SupabaseClient";
import { useNavigate } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        console.log("useridcheck in header", user.id);
        setUserId(user.id);
      } else {
        console.log("No user found or not logged in", error);
      }
    };

    getUserId();
  }, []);
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/login");
    } else {
      console.error("Sign out error:", error.message);
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between bg-yellow-400 px-2 py-3 sm:px-4 sm:py-4 md:px-6 md:py3.5 shadow-md border-b border-yellow-500"
    >
      {/* Logo, Brand, and Username */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 sm:gap-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="32"
          height="32"
          className="text-yellow-800 sm:w-10 sm:h-10 animate-pulse"
        >
          <text y=".9em" fontSize="90">
            🍕
          </text>
        </svg>
        <Link
          to="/"
          className="text-base sm:text-lg font-extrabold text-gray-900 uppercase tracking-wider hover:text-yellow-800 transition-colors duration-200"
        >
          Hot & Spicy
        </Link>
        <span className="text-yellow-800 font-bold text-sm sm:text-base">|</span>
        <div
          className="text-base sm:text-lg md:text-xl font-bold text-gray-900"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <Username />
        </div>
      </motion.div>

      {/* Search and Sign Out */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2 sm:gap-4 flex-col sm:flex-row"
      >
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <SearchOrder />
        </motion.div>

        {/* Sign Out Button */}
        <button
          onClick={signOut}
          className="bg-yellow-600 text-white text-xs sm:text-sm font-semibold uppercase tracking-wide px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-yellow-700 transition-colors duration-200 shadow-sm"
        >
          Sign Out
        </button>
      </motion.div>
    </motion.header>
  );
}

export default Header;