import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [visibleCount, setVisibleCount] = useState(12);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      // .get("http://localhost:5000/api/products")
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data produk:", error);
      });
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <div className="w-full px-4">
      <div className="flex lg:flex-row flex-col justify-between align-center">
        <h1 className="text-xl text-gray-400 font-medium ml-5">
          Rekomendasi Untuk Anda
        </h1>
        <a href="/products" className="lg:mr-6 lg:ml-0 ml-5 text-teal-400 hover:underline">Semua produk</a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4 py-6">
        {products.slice(0, visibleCount).map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all w-[99%] sm:w-[190px] lg:w-[195px] xl:w-[200px]"
          >
            <div className="relative">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-32 object-cover"
              />
              <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                Sale
              </span>
            </div>

            <div className="p-2 space-y-1">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>

              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Rp{product.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {products.length > 0 && visibleCount < products.length && (
        <div className="text-center mb-6">
          <button
            onClick={handleLoadMore}
            className="px-20 py-2 border border-teal-500 text-teal-500 hover:text-white hover:bg-teal-500 transition-all text-md"
          >
            Muat Lebih Banyak
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
