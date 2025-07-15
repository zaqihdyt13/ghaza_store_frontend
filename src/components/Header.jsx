import { useEffect, useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
// import { PiBellSimple } from "react-icons/pi";
import { FaOpencart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleClearInput = () => setInputValue("");

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  const isTokenValid = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp;
      if (!exp) return false;
      return Date.now() < exp * 1000;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };

    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 w-full z-40 bg-white transition-shadow duration-300 ${
          atTop ? "shadow-none" : "shadow-md md:shadow-xl shadow-teal-200"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-5 lg:px-8">
          <div>
            <span
              onClick={() => navigate("/")}
              className="text-teal-500 font-bold text-2xl barriecito-regular cursor-pointer"
            >
              ghazaStore
            </span>
            <p className="text-sm text-gray-400 coral-pixels-regular -mt-1">
              Setiap Pilihan Adalah Gaya Anda
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputValue.trim() !== "") {
                    navigate(
                      `/products?search=${encodeURIComponent(
                        inputValue.trim()
                      )}`
                    );
                  }
                }}
                placeholder="Search in ghazaStore"
                className="pl-10 pr-10 py-2 border border-gray-200 rounded-2xl text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-0"
              />
              {inputValue && (
                <FiX
                  onClick={handleClearInput}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 cursor-pointer w-5 h-5"
                />
              )}
            </div>

            <NotificationBell />
            <a
              onClick={() => navigate("/shopping-cart")}
              className={`w-10 h-10 flex justify-center items-center border rounded-2xl ${
                isActive("/shopping-cart")
                  ? "bg-teal-500 text-white border-teal-500"
                  : "text-gray-500 hover:text-teal-500 hover:border-teal-500"
              }`}
            >
              <FaOpencart className="w-5 h-5" />
            </a>

            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="border text-gray-500 hover:border-teal-500 hover:text-teal-500 transition-all px-4 py-2 rounded-lg text-xs font-semibold uppercase cursor-pointer"
                >
                  Masuk
                </button>
                <button
                  onClick={() => navigate("/auth/register")}
                  className="bg-gradient-to-tr from-teal-600 to-teal-400 text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase hover:shadow-md transition-all shadow-teal-200 cursor-pointer"
                >
                  Daftar
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/user/profile")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-semibold uppercase cursor-pointer ${
                    isActive("/user/profile")
                      ? "bg-teal-500 text-white border-teal-500"
                      : "text-gray-500 hover:text-teal-500 hover:border-teal-500"
                  }`}
                >
                  👤 Profil
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg border text-gray-500 hover:text-teal-500 hover:border-teal-500 text-xs font-semibold uppercase cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          <button
            className="hidden md:block lg:hidden text-gray-500 border p-2 rounded-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="px-4 pb-4 flex flex-col gap-3 lg:hidden">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputValue.trim() !== "") {
                    navigate(
                      `/products?search=${encodeURIComponent(
                        inputValue.trim()
                      )}`
                    );
                    setMenuOpen(false);
                  }
                }}
                placeholder="Search in ghazaStore"
                className="pl-10 pr-10 py-2 border border-gray-200 rounded-2xl text-sm text-gray-600 placeholder:text-gray-400 w-full"
              />
              {inputValue && (
                <FiX
                  onClick={handleClearInput}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 cursor-pointer w-5 h-5"
                />
              )}
            </div>

            <div className="flex gap-3">
              <NotificationBell />
              <a
                onClick={() => navigate("/shopping-cart")}
                className="w-10 h-10 flex justify-center items-center border rounded-2xl text-gray-500 hover:text-teal-500"
              >
                <FaOpencart className="w-5 h-5" />
              </a>
            </div>

            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="border border-teal-500 text-teal-500 px-4 py-2 rounded-lg text-xs font-semibold uppercase w-full"
                >
                  Masuk
                </button>
                <button
                  onClick={() => navigate("/auth/register")}
                  className="bg-gradient-to-tr from-teal-600 to-teal-400 text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase shadow-md w-full"
                >
                  Daftar
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/user/profile")}
                  className="border border-teal-500 text-teal-500 px-4 py-2 rounded-lg text-xs font-semibold uppercase w-full"
                >
                  👤 Profil
                </button>
                <button
                  onClick={handleLogout}
                  className="border border-teal-500 text-teal-500 px-4 py-2 rounded-lg text-xs font-semibold uppercase w-full"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-md flex justify-around items-center py-2">
        <button
          onClick={() => navigate("/")}
          className={`flex flex-col items-center text-xs ${
            isActive("/") ? "text-teal-500" : "text-gray-500"
          }`}
        >
          <FiMenu className="w-5 h-5 mb-1" />
          Home
        </button>
        <button
          onClick={() => navigate("/products")}
          className={`flex flex-col items-center text-xs ${
            isActive("/products") ? "text-teal-500" : "text-gray-500"
          }`}
        >
          <FiSearch className="w-5 h-5 mb-1" />
          Cari
        </button>
        <button
          onClick={() => navigate("/shopping-cart")}
          className={`flex flex-col items-center text-xs ${
            isActive("/shopping-cart") ? "text-teal-500" : "text-gray-500"
          }`}
        >
          <FaOpencart className="w-5 h-5 mb-1" />
          Keranjang
        </button>
        <button
          onClick={() =>
            isLoggedIn ? navigate("/user/profile") : navigate("/auth/login")
          }
          className={`flex flex-col items-center text-xs ${
            isActive("/user/profile") || isActive("/auth/login")
              ? "text-teal-500"
              : "text-gray-500"
          }`}
        >
          👤
          <span>{isLoggedIn ? "Profil" : "Masuk"}</span>
        </button>
      </div>
    </>
  );
};

export default Header;
