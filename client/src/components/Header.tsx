import { Link } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  // Check login state on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="w-screen flex flex-col items-center">
      <div className="max-w-5xl w-full p-5">
        <div className="first-heading flex justify-between items-center">
          <div className="logo flex gap-2 items-center">
            <CircleCheckBig className="size-10 text-blue-600" />
            <h1 className="text-3xl font-bold">My Tasks</h1>
          </div>

          {/* HEADER BUTTONS */}
          {!user ? (
            <Link
              to="/login"
              className="p-2 bg-blue-400 text-white rounded-lg font-semibold border-2 hover:border-blue-400 hover:bg-white hover:text-blue-400 duration-300 cursor-pointer"
            >
              Login / Signup
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <span className="font-semibold">Hi, {user.name}</span>

              <button
                onClick={handleLogout}
                className="p-2 bg-red-500 text-white rounded-lg font-semibold border-2 hover:border-red-500 hover:bg-white hover:text-red-500 duration-300 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <h1 className="py-8 text-5xl font-bold">
          What's on your plate today?
        </h1>
      </div>
    </div>
  );
};

export default Header;
