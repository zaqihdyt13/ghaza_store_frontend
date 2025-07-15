import Tables from "../../../components/admin/Tables";
import Sidebar from "../../../components/admin/desktop/Sidebar";
import Header from "../../../components/admin/desktop/Header";
import NavbarMobile from "../../../components/admin/mobile/NavbarMobile";
import Footer from "../../../components/admin/Footer";
import { useNavigate } from "react-router-dom";

const CategoriesColorsSizes = () => {
  // const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/categories`;
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 font-family-karla flex min-h-screen">
      <Sidebar />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <Header />
        <NavbarMobile />
        <main className="w-full overflow-x-hidden border-t-2 border-teal-400 flex flex-col">
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-gray-900 pb-6">Kelola Atribut</h1>
            <button
              onClick={() => navigate("/admin/category/create")}
              className="bg-teal-400 text-white hover:bg-teal-300 transition-all font-bold float-end mr-1 p-2 rounded-md cursor-pointer"
            >
              Buat Kategori
            </button>
            <Tables
              apiUrl={`${import.meta.env.VITE_API_BASE_URL}/api/categories`}
              editPath="/admin/category/edit"
            />
            <button
              onClick={() => navigate("/admin/color/create")}
              className="bg-teal-400 text-white hover:bg-teal-300 transition-all font-bold float-end mr-1 p-2 rounded-md cursor-pointer"
            >
              Buat Warna
            </button>
            <Tables
              apiUrl={`${import.meta.env.VITE_API_BASE_URL}/api/colors`}
              editPath="/admin/color/edit"
            />
            <button
              onClick={() => navigate("/admin/size/create")}
              className="bg-teal-400 text-white hover:bg-teal-300 transition-all font-bold float-end mr-1 p-2 rounded-md cursor-pointer"
            >
              Buat Ukuran
            </button>
            <Tables
              apiUrl={`${import.meta.env.VITE_API_BASE_URL}/api/sizes`}
              editPath="/admin/size/edit"
            />
          </main>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default CategoriesColorsSizes;
