import { useState } from "react";
import {
  FaAlignLeft,
  FaBars,
  FaCalendar,
  FaCogs,
  FaPlus,
  FaStickyNote,
  FaTable,
  FaTabletAlt,
  FaTachometerAlt,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavbarMobile = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    // localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <header className="w-full bg-teal-400 py-5 px-6 sm:hidden">
      <div className="flex items-center justify-between">
        <a
          href="/"
          className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
        >
          Admin
        </a>
        <div>
          <button
            onClick={() => setMobileNavOpen(!isMobileNavOpen)}
            className="text-white text-3xl focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileNavOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Dropdown Nav */}
      <nav className={`${isMobileNavOpen ? "flex" : "hidden"} flex-col pt-4`}>
        <a
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center active-nav-link text-white py-2 pl-4 nav-item"
        >
          <FaTachometerAlt className="mr-3" /> Dashboard
        </a>
        <a
          onClick={() => navigate("/admin/users")}
          className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
        >
          <FaStickyNote className="mr-3" /> Pengguna
        </a>
        <a
          onClick={() => navigate("/admin/products")}
          className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
        >
          <FaTable className="mr-3" /> Kelola Produk
        </a>
        <a
          onClick={() => navigate("/admin/ads")}
          className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
        >
          <FaAlignLeft className="mr-3" /> Kelola Papan Iklan
        </a>
        <a
          href="/admin/attributes"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
        >
          <FaTabletAlt className="mr-3" /> Kelola Atribut
        </a>
        <a
          href="/admin/orders"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
        >
          <FaCalendar className="mr-3" /> Kelola Pesanan
        </a>
        <a
          href="#"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
        >
          <FaCogs className="mr-3" /> Support
        </a>
        <a
          href="#"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
        >
          <img
            className="w-5 mr-2"
            src="https://images.unsplash.com/vector-1740737650825-1ce4f5377085?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="User avatar"
          />{" "}
          Akun
        </a>
        <button
          onClick={handleLogout}
          className="w-full bg-white cta-btn font-semibold py-2 mt-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center"
        >
          <FaPlus className="mr-3" /> Keluar
        </button>
      </nav>
    </header>
  );
};

export default NavbarMobile;
