import {
  FaAlignLeft,
  FaCalendar,
  FaStickyNote,
  FaTable,
  FaTabletAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      path: "/admin/dashboard",
      icon: <FaTachometerAlt className="mr-3" />,
      label: "Dashboard",
    },
    {
      path: "/admin/users",
      icon: <FaStickyNote className="mr-3" />,
      label: "Pengguna",
    },
    {
      path: "/admin/products",
      icon: <FaTable className="mr-3" />,
      label: "Kelola Produk",
    },
    {
      path: "/admin/ads",
      icon: <FaAlignLeft className="mr-3" />,
      label: "Kelola Papan Iklan",
      external: true,
    },
    {
      path: "/admin/attributes",
      icon: <FaTabletAlt className="mr-3" />,
      label: "Kelola Atribut",
      external: true,
    },
    {
      path: "/admin/orders",
      icon: <FaCalendar className="mr-3" />,
      label: "Kelola Pesanan",
      external: true,
    },
  ];

  const handleLogout = () => {
    // Hapus token dari localStorage dan update status login
    localStorage.clear();
    // localStorage.removeItem("token");
    navigate("/auth/login"); // Redirect ke halaman login
  };

  return (
    <aside className="relative h-screen w-64 hidden sm:block shadow-xl bg-teal-600">
      <div className="p-6">
        <a
          href="/"
          className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
        >
          Admin
        </a>
        <button onClick={handleLogout} className="w-full bg-white text-teal-600 font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
          <AiOutlineLogout className="mr-3 text-3xl" /> Keluar
        </button>
      </div>

      <nav className="text-white text-base font-semibold pt-3">
        {navItems.map(({ path, icon, label, external }) => {
          const isActive = location.pathname === path;

          const className = `flex items-center py-4 pl-6 nav-item ${
            isActive
              ? "bg-white text-teal-400"
              : "text-white opacity-75 hover:opacity-100"
          }`;

          return external ? (
            <a key={path} href={path} className={className}>
              {icon} {label}
            </a>
          ) : (
            <a key={path} onClick={() => navigate(path)} className={className}>
              {icon} {label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
