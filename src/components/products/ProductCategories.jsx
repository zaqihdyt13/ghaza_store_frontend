import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categoryImages = {
    Pria: "https://images.unsplash.com/photo-1559697242-cacab5d5b62c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Wanita:
      "https://images.unsplash.com/photo-1572251328767-e59f06f13ba1?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Kaos: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Kemeja:
      "https://images.unsplash.com/photo-1549037173-e3b717902c57?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Celana Panjang":
      "https://images.unsplash.com/photo-1551619873-fcaaf90f88b5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Celana Pendek":
      "https://res-console.cloudinary.com/dc5ajmn6z/thumbnails/v1/image/upload/v1753582365/Q2hhdEdQVF9JbWFnZV9KdWxfMjdfMjAyNV8wOV8xMl8xOF9BTV9ranJlems=/drilldown",
    "Jaket & Hoodie":
      "https://images.unsplash.com/photo-1699275303892-660bd1c8483a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:5000/api/categories"
          `${import.meta.env.VITE_API_BASE_URL}/api/categories`
        ); // Ganti jika endpoint berbeda
        setCategories(response.data);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
        const dummyProducts = [
          {
            id: 1,
            name: "Pria",
            image_url:
              "https://images.unsplash.com/photo-1559697242-cacab5d5b62c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: 2,
            name: "Wanita",
            image_url:
              "https://images.unsplash.com/photo-1572251328767-e59f06f13ba1?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: 3,
            name: "Kaos",
            image_url:
              "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: 4,
            name: "Kemeja",
            image_url:
              "https://images.unsplash.com/photo-1549037173-e3b717902c57?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: 5,
            name: "Celana Panjang",
            image_url:
              "https://images.unsplash.com/photo-1551619873-fcaaf90f88b5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: 6,
            name: "Celana Pendek",
            image_url:
              "https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-bdb4-622f-99d0-d18b2b4e1032/raw?se=2025-07-08T02%3A33%3A17Z&sp=r&sv=2024-08-04&sr=b&scid=85f26236-2177-5956-bb3c-7e26e294da2a&skoid=b0fd38cc-3d33-418f-920e-4798de4acdd1&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-07T22%3A27%3A15Z&ske=2025-07-08T22%3A27%3A15Z&sks=b&skv=2024-08-04&sig=waHp1XW8Nevoh7QN3rqaCbKDT9%2BR0MH1T/4KBZgL6jw%3D",
          },
          {
            id: 7,
            name: "Jaket & Hoodie",
            image_url:
              "https://images.unsplash.com/photo-1699275303892-660bd1c8483a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ];

        setCategories(dummyProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    const encodedCategory = encodeURIComponent(categoryName); // penting!
    navigate(`/products?category=${encodedCategory}`);
  };

  return (
    <div className="w-full px-4">
      <h1 className="text-xl text-gray-400 font-medium ml-5">Kategori</h1>
      {loading ? (
        <p className="text-center text-gray-500">Memuat kategori...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4 py-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative">
                <img
                  src={
                    categoryImages[category.name] || "https://placehold.co/400"
                  }
                  alt={category.name}
                  className="w-full h-32 object-cover"
                />
                <span className="absolute top-2 right-2 bg-teal-400 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  {category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCategories;
