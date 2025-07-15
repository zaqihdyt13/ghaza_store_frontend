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

        const dummyProducts = [
          {
            id: 1,
            name: "Converse Tee Kaos Lengan Pendek",
            price: 40000,
            image_url:
              "https://res.cloudinary.com/dc5ajmn6z/image/upload/v1751298193/ghaza-products/xsxgrxjqidbiwxztzk9q.jpg",
            description: "Kaos Baju CONVERSE Tee Navy White Original",
            average_rating: 4.7,
            total_reviews: 6,
          },
          {
            id: 2,
            name: "GAP Zip Up Hoodie",
            price: 170000,
            image_url:
              "https://res.cloudinary.com/dc5ajmn6z/image/upload/v1751298424/ghaza-products/acrbekhcpmnm6qtldhzw.jpg",
            description: "GAP Logo Sherpa-Lined Zip Up Hoodie",
            average_rating: 4.5,
            total_reviews: 6,
          },
          {
            id: 3,
            name: "UNIQLO Kemeja Putih Panjang Pria",
            price: 120000,
            image_url:
              "https://res.cloudinary.com/dc5ajmn6z/image/upload/v1751299377/ghaza-products/axpfjbtpghllgcl68h8q.jpg",
            description: "Kemeja Putih UNIQLO Kemeja Lengan Panjang",
            average_rating: 3.5,
            total_reviews: 6,
          },
          {
            id: 4,
            name: "Wrangler Celana Panjang Denim",
            price: 240000,
            image_url:
              "https://res.cloudinary.com/dc5ajmn6z/image/upload/v1751299793/ghaza-products/yznmobmfs7s4klsonlg0.jpg",
            description: "Celana wrangler original jeans panjang",
            average_rating: 4.7,
            total_reviews: 6,
          },
          {
            id: 5,
            name: "Nike Sport Celana Pendek",
            price: 40000,
            image_url:
              "https://res.cloudinary.com/dc5ajmn6z/image/upload/v1751300161/ghaza-products/ocgaz3cmvnwxjgegfgtf.jpg",
            description: "Celana Pendek NIKE Sport Polos Baby Terry",
            average_rating: 4.5,
            total_reviews: 6,
          },
          {
            id: 6,
            name: "Crocodile Kemeja Lengan Pendek",
            price: 140000,
            image_url:
              "https://res.cloudinary.com/dc5ajmn6z/image/upload/v1751300414/ghaza-products/qv4x7o1g8e6bzmiedlhh.jpg",
            description: "Kemeja pria Crocodile lengan pendek bahan adem",
            average_rating: 3.3,
            total_reviews: 6,
          },
          {
            id: 7,
            name: "Nike Hoodie Hitam",
            price: 220000,
            image_url:
              "https://res.cloudinary.com/dc5ajmn6z/image/upload/v1751300747/ghaza-products/uwvviul8ezj5bsah0j5t.png",
            description: "Nike Hoodied Black Small Logo Swoosh",
            average_rating: 4.7,
            total_reviews: 6,
          },
          {
            id: 8,
            name: "Adidas Kaos Pria Katun Combed Lengan Pendek",
            price: 35000,
            image_url:
              "https://res.cloudinary.com/dc5ajmn6z/image/upload/v1751301097/ghaza-products/bmgupzojvvthdjixwpti.png",
            description: "Kaos lengan pendek cotton combed",
            average_rating: 4.7143,
            total_reviews: 7,
          },
          {
            id: 9,
            name: "Adidas Celana Training Pria",
            price: 75000,
            image_url:
              "https://res.cloudinary.com/dc5ajmn6z/image/upload/v1751328561/ghaza-products/rsj27occ88pon3bfnyrf.jpg",
            description: "Celana Training Pria Adidas Sereno 3-Stripes",
            average_rating: 3.8,
            total_reviews: 6,
          },
          {
            id: 10,
            name: "H&M New York Hoodie Wanita Pink",
            price: 180000,
            image_url:
              "https://res.cloudinary.com/dc5ajmn6z/image/upload/v1751328993/ghaza-products/sjbndlombsimamnpth7g.jpg",
            description: "Hoodie H&M Newyork Pink",
            average_rating: 4.7,
            total_reviews: 6,
          },
        ];

        setProducts(dummyProducts);
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
        <a
          href="/products"
          className="lg:mr-6 lg:ml-0 ml-5 text-teal-400 hover:underline"
        >
          Semua produk
        </a>
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
