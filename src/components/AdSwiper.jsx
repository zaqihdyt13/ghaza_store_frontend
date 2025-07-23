import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const AdSwiper = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/ads`
      );
      setAds(response.data);
    };
    fetchAds();
  }, []);

  return (
    <div className="w-full max-w-8xl mx-auto px-0 md:px-6 mt-0 md:mt-4">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className="rounded-none md:rounded-2xl"
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad.id}>
            <div className="w-full lg:aspect-[16/4]">
              <img
                src={ad.image_url}
                alt={ad.title}
                className="w-full h-full object-cover object-center rounded-xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdSwiper;
