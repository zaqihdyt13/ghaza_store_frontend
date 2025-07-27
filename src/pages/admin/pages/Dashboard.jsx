import Tables from "../../../components/admin/Tables";
import Sidebar from "../../../components/admin/desktop/Sidebar";
import Header from "../../../components/admin/desktop/Header";
import NavbarMobile from "../../../components/admin/mobile/NavbarMobile";
import Footer from "../../../components/admin/Footer";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Card = ({ title, count, color }) => (
  <div className={`p-6 rounded-lg shadow-md text-white ${color}`}>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-3xl font-bold">{count}</p>
  </div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

const Dashboard = () => {
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  const [counts, setCounts] = useState({
    users: 0,
    products: 0,
    categories: 0,
    colors: 0,
    sizes: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [usersRes, productsRes, categoriesRes, colorsRes, sizesRes] =
          await Promise.all([
            fetch(`${apiUrl}/users`).then((res) => res.json()),
            fetch(`${apiUrl}/products`).then((res) => res.json()),
            fetch(`${apiUrl}/categories`).then((res) => res.json()),
            fetch(`${apiUrl}/colors`).then((res) => res.json()),
            fetch(`${apiUrl}/sizes`).then((res) => res.json()),
          ]);

        setCounts({
          users: usersRes.length,
          products: productsRes.length,
          categories: categoriesRes.length,
          colors: colorsRes.length,
          sizes: sizesRes.length,
        });
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchCounts();
  }, [apiUrl]);

  return (
    <div className="bg-gray-100 font-family-karla flex min-h-screen">
      <Sidebar />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <Header />
        <NavbarMobile />
        <main className="w-full overflow-x-hidden border-t-2 border-teal-400 flex flex-col">
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-gray-900 pb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <Card
                title="Total User"
                count={counts.users}
                color="bg-blue-500"
              />
              <Card
                title="Total Produk"
                count={counts.products}
                color="bg-green-500"
              />
              <Card
                title="Total Kategori"
                count={counts.categories}
                color="bg-yellow-500"
              />
              <Card
                title="Total Warna"
                count={counts.colors}
                color="bg-purple-500"
              />
              <Card
                title="Total Ukuran"
                count={counts.sizes}
                color="bg-pink-500"
              />
            </div>

            <Tables apiUrl={apiUrl} />
          </main>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
