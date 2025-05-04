import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((state) => state.user.username);

  return (
    <div
      className="text-base sm:text-lg md:text-xl font-bold text-yellow-800"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {username}
    </div>
  );
}

export default Username;