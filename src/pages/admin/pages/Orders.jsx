import Tables from "../../../components/admin/Tables";
import Sidebar from "../../../components/admin/desktop/Sidebar";
import Header from "../../../components/admin/desktop/Header";
import NavbarMobile from "../../../components/admin/mobile/NavbarMobile";
import Footer from "../../../components/admin/Footer";

const Orders = () => {
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/order`;

  return (
    <div className="bg-gray-100 font-family-karla flex min-h-screen">
      <Sidebar />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <Header />
        <NavbarMobile />

        <main className="w-full overflow-x-hidden border-t-2 border-teal-400 border-2 flex flex-col">
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-gray-900 pb-6">Kelola Pesanan</h1>
            <Tables apiUrl={apiUrl} editPath="/admin/order" hideDelete />
          </main>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Orders;
