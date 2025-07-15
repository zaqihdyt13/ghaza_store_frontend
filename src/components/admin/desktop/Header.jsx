import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isAccountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    // localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex shadow-lg shadow-teal-200">
      <div className="w-1/2">
        <h1 className="text-teal-400 font-bold text-lg">Selamat Datang</h1>
      </div>
      <div className="relative w-1/2 flex justify-end">
        <button
          onClick={() => setAccountOpen(!isAccountOpen)}
          className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-2 border-gray-800 hover:border-teal-400 focus:border-gray-300 focus:outline-none"
          aria-label="User menu"
        >
          <img
            src="https://images.unsplash.com/vector-1740737650825-1ce4f5377085?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="User avatar"
          />
        </button>
        {isAccountOpen && (
          <>
            <button
              onClick={() => setAccountOpen(false)}
              className="h-full w-full fixed inset-0 cursor-default"
              aria-label="Close menu"
            ></button>
            <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16 right-0">
              <a
                href="#"
                className="block px-4 py-2 account-link hover:text-teal-400 cursor-pointer"
              >
                Akun
              </a>
              <a
                href="#"
                className="block px-4 py-2 account-link hover:text-teal-400 cursor-pointer"
              >
                Bantuan
              </a>
              <a
                onClick={handleLogout}
                className="block px-4 py-2 account-link hover:text-teal-400 cursor-pointer"
              >
                Keluar
              </a>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
