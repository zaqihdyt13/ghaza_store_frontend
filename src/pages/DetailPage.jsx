import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import Rating from "../components/ProductRating";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import RatingForm from "../components/RatingForm";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

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

const DetailPage = () => {
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [userRating, setUserRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:5000/api/products/${id}`
          `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Gagal mengambil detail produk");
        setLoading(false);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/products/${id}/recommendations`
          // `http://localhost:5000/api/products/${id}/recommendations`
        );
        setRecommendations(response.data.recommendations || []);
      } catch (err) {
        console.error("Gagal mengambil rekomendasi produk", err);
        setRecommendations([]); // fallback agar tidak error
      }
    };

    const fetchUserRating = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/ratings/user-rating/check`,
          {
            params: {
              productId: id,
              userId,
            },
          }
        );
        setUserRating(response.data.rating || null);
      } catch (err) {
        console.error("Gagal mengambil rating user", err);
      }
    };

    fetchProductDetails();
    fetchRecommendations();
    fetchUserRating();
  }, [id, userId]);

  const addToCart = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth/login");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/cart`,
        {
          product_id: product.id,
          quantity: 1,
        },
        config
      );
      toast.success("Produk berhasil ditambahkan ke keranjang!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Gagal menambahkan produk ke keranjang.");
    }
  };

  // const addToCart = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     navigate("/auth/login");
  //     return;
  //   }

  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   try {
  //     await axios.post(
  //       `${import.meta.env.VITE_API_BASE_URL}/api/cart`,
  //       // "http://localhost:5000/api/cart",
  //       {
  //         product_id: product.id,
  //         quantity: 1,
  //       },
  //       config
  //     );
  //     alert("Product added to cart");
  //   } catch (err) {
  //     console.error(err.response?.data || err.message);
  //     alert("Failed to add to cart");
  //   }
  // };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="bg-white">
      <Header />
      <div className="py-6">
        <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="w-full flex flex-col justify-center items-center mb-8">
            <div className="w-full aspect-[4/3] sm:aspect-[3/2] md:aspect-[5/3] lg:aspect-[4/3] overflow-hidden flex justify-center items-center">
              <img
                src={product.image_url}
                alt="Product"
                className="object-contain w-full h-full"
              />
            </div>
            <h1 className="text-xl text-gray-400 font-medium ml-5 mt-6">
              Mungkin Anda juga suka
            </h1>
            <div className="w-full px-4 py-4">
              {recommendations.length === 0 ? (
                <p className="text-sm text-gray-400 text-center">
                  Tidak ada rekomendasi
                </p>
              ) : (
                <div className="relative w-full px-4 py-4">
                  {/* Tombol Panah Kiri */}
                  <div
                    ref={prevRef}
                    className="swiper-button-custom absolute z-10 left-2 top-[40%] cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-400 hover:text-black"
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
                  <div
                    ref={nextRef}
                    className="swiper-button-custom absolute z-10 right-2 top-[40%] cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-400 hover:text-black"
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
                    modules={[Navigation, Pagination]}
                    spaceBetween={12}
                    slidesPerView={2}
                    navigation={{
                      prevEl: prevRef.current,
                      nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                      if (typeof swiper.params.navigation !== "boolean") {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                      }
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                      640: { slidesPerView: 3 },
                      768: { slidesPerView: 3.5 },
                      1024: { slidesPerView: 3 },
                      1280: { slidesPerView: 3 },
                    }}
                  >
                    {recommendations.map((recom) => (
                      <SwiperSlide key={recom.id}>
                        <div
                          onClick={() => navigate(`/products/${recom.id}`)}
                          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer mb-8"
                        >
                          <div className="relative">
                            <img
                              src={recom.image_url}
                              alt={recom.name}
                              className="w-full h-32 object-cover"
                            />
                            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                              Sale
                            </span>
                          </div>
                          <div className="p-2 space-y-1 min-h-[145px]">
                            <h3 className="text-sm font-semibold text-gray-900">
                              {recom.name}
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-2 h-10 overflow-hidden">
                              {recom.description}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <div>
                                <p className="text-sm font-bold text-gray-900">
                                  Rp{recom.price}
                                </p>
                                <p className="text-xs text-gray-500 line-through">
                                  Rp69.000
                                </p>
                              </div>
                              <div className="text-xs text-yellow-400">
                                ★★★★☆
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 lg:pl-8 px-4">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl tracking-tight text-gray-900">
              Rp{Number(product.price).toLocaleString("id-ID")}
            </p>

            {/* Rating Info */}
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2">
                <StarRating rating={product.average_rating} />
                <p className="text-sm text-green-600">
                  {product.average_rating} / 5 ({product.total_reviews} ulasan)
                </p>
              </div>

              <div className="border-t pt-4 mt-4">
                {userRating ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <span className="text-sm">Rating kamu:</span>
                    <StarRating rating={userRating} />
                    <span className="font-semibold">{userRating}</span>
                    <span className="text-sm">/ 5</span>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-lg font-semibold mb-1">Beri Rating</h2>
                    <RatingForm
                      productId={product.id}
                      userId={userId}
                      // onSuccess={fetchUserRating}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Deskripsi</h3>
              <div className="mt-4 text-sm text-gray-700">
                {product.description}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-1">Kategori:</h3>
              <div className="flex gap-2 flex-wrap">
                {product.categories.map((category) => (
                  <span
                    key={category.id}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-1">Available Sizes:</h3>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <span
                    key={size.id}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                  >
                    {size.size_name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-1">Available Colors:</h3>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <span
                    key={color.id}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm border border-gray-300"
                  >
                    {color.color_name}
                  </span>
                ))}
              </div>
            </div>

            <form className="mt-10">
              <button
                onClick={addToCart}
                className="cursor-pointer flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-tr from-teal-600 to-teal-400 px-8 py-3 text-white hover:bg-indigo-700"
              >
                Tambahkan ke Keranjang
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </div>
  );
};

export default DetailPage;
