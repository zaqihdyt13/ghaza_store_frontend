import { useEffect, useState } from "react";
import Header from "../components/Header";
import PopularProducts from "../components/products/PopularProducts";
import AdSwiper from "../components/AdSwiper";
import ProductCategories from "../components/products/ProductCategories";
import Products from "../components/products/Products";
import Footer from "../components/Footer";

const HomePage = () => {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    setIsStandalone(standalone);
  }, []);

  return (
    <div className="p-0 m-0">
      <Header />
      <p className="text-sm text-gray-500 my-2 ms-6">
        Mode: {isStandalone ? "Standalone (PWA)" : "Browser"}
      </p>
      <AdSwiper />
      <PopularProducts />
      <ProductCategories />
      <Products />
      <Footer />
    </div>
  );
};

export default HomePage;
