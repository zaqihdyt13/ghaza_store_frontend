import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const StarRating = ({ rating, maxStars = 5 }) => {
  const filled = Math.floor(rating);
  const half = rating - filled >= 0.5;
  const empty = maxStars - filled - (half ? 1 : 0);

  return (
    <div className="flex text-yellow-400">
      {Array(filled)
        .fill()
        .map((_, i) => (
          <BsStarFill key={`f-${i}`} />
        ))}
      {half && <BsStarHalf />}
      {Array(empty)
        .fill()
        .map((_, i) => (
          <BsStar key={`e-${i}`} className="text-gray-300" />
        ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  maxStars: PropTypes.number,
};

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:5000/api/products/popular"
          `${import.meta.env.VITE_API_BASE_URL}/api/products/popular`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Gagal mengambil produk populer:", error);
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
      }
    };

    fetchPopularProducts();
  }, []);

  // useEffect(() => {
  //   const fetchPopularProducts = async () => {
  //     try {
  //       const response = await axios.get(
  //         // "http://localhost:5000/api/products/popular"
  //         `${import.meta.env.VITE_API_BASE_URL}/api/products/popular`
  //       );
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.error("Gagal mengambil produk populer:", error);
  //     }
  //   };

  //   fetchPopularProducts();
  // }, []);

  return (
    <div className="relative w-full px-4 lg:px-8 py-4">
      <h1 className="text-3xl text-teal-400 font-bold mb-4">
        Produk Terpopuler
      </h1>
      {/* Tombol Panah Kiri */}
      <div ref={prevRef} className="swiper-button-custom left-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-700 hover:text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>

      {/* Tombol Panah Kanan */}
      <div ref={nextRef} className="swiper-button-custom right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-700 hover:text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>

      <Swiper
        slidesPerView={6}
        spaceBetween={2}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          320: {
            slidesPerView: 2.2,
          },
          480: {
            slidesPerView: 3.1,
          },
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 6,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
        modules={[Navigation]}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="flex justify-center py-2">
            <div
              onClick={() => navigate(`/products/${product.id}`)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all w-[85%] sm:w-[120px] md:w-[140px] lg:w-[160px] xl:w-[180px]"
            >
              <div className="relative">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-32 object-cover"
                />
                <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  Terpopuler
                </span>
              </div>

              <div className="p-2 space-y-1">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Rp{product.price}
                    </p>
                    {/* <p className="text-xs text-gray-500 line-through">
                      Rp69.000
                    </p> */}
                  </div>

                  <div className="text-xs text-yellow-500 flex items-center gap-1">
                    <span>
                      {/* {Array.from({ length: 5 }, (_, i) => (
                        <span key={i}>
                          {i < Math.round(product.average_rating || 0)
                            ? "★"
                            : "☆"}
                        </span>
                      ))} */}
                      <StarRating rating={product.average_rating} />
                    </span>
                    <span className="text-[10px] text-gray-500">
                      ({product.total_reviews || 0})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Styling tombol panah */}
      <style>{`
        .swiper-button-custom {
          position: absolute;
          top: 50%;
          z-index: 10;
          transform: translateY(-50%);
          background: white;
          padding: 0.3rem;
          border-radius: 9999px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default PopularProducts;
