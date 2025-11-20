import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleCheckBig, User } from "lucide-react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Detect login / logout
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Notify app
    window.dispatchEvent(new Event("storage"));

    setDropdownOpen(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="w-screen flex flex-col items-center relative ">
      <div className="max-w-5xl w-full p-5 bg-blue-200 rounded-lg mb-10">
        <div className="first-heading flex justify-between relative">

          {/* Logo */}
          <div className="logo flex gap-2">
            <CircleCheckBig className="size-10 text-blue-600" />
            <h1 className="text-3xl font-bold">My Tasks</h1>
          </div>

          {/* RIGHT SIDE BUTTON */}
          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/login")}
              className="p-2 bg-blue-400 text-white rounded-lg font-semibold border-2 hover:border-blue-400 hover:bg-white hover:text-blue-400 duration-300 cursor-pointer"
            >
              Login / Signup
            </button>
          ) : (
            <div className="relative">
              {/* Profile Button */}
              <button
                onClick={handleProfileClick}
                className="p-2 rounded-full border-2 hover:bg-blue-100 duration-300"
              >
                <User className="size-7 text-blue-600" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-xl border">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
