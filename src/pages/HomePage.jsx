import { useEffect, useState } from "react";
import Header from "../components/Header";
import PopularProducts from "../components/products/PopularProducts";
import AdSwiper from "../components/AdSwiper";
import ProductCategories from "../components/products/ProductCategories";
import Products from "../components/products/Products";
import Footer from "../components/Footer";

const HomePage = () => {
  const [isStandalone, setIsStandalone] = useState(false);
  // const [notifPermission, setNotifPermission] = useState(
  //   Notification.permission
  // );

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    setIsStandalone(standalone);
  }, []);

  // useEffect(() => {
  //   const requestNotificationPermission = async () => {
  //     if ("Notification" in window && "serviceWorker" in navigator) {
  //       if (Notification.permission === "default") {
  //         const permission = await Notification.requestPermission();
  //         setNotifPermission(permission);
  //       } else {
  //         setNotifPermission(Notification.permission);
  //       }
  //     }
  //   };
  //   requestNotificationPermission();
  // }, []);

  // const showNotif = async () => {
  //   if (notifPermission === "granted") {
  //     try {
  //       const registration = await navigator.serviceWorker.ready;
  //       registration.showNotification("Promo Terbaru!", {
  //         body: "Diskon 50% untuk semua produk hari ini!",
  //         icon: "/pwa-192x192.png",
  //         vibrate: [200, 100, 200],
  //         tag: "promo-today",
  //       });
  //     } catch (err) {
  //       console.error("Gagal menampilkan notifikasi:", err);
  //     }
  //   } else if (notifPermission === "denied") {
  //     alert(
  //       "Izin notifikasi ditolak, silakan aktifkan izin di pengaturan browser."
  //     );
  //   } else {
  //     alert("Izin notifikasi belum diberikan.");
  //   }
  // };

  return (
    <div className="p-0 m-0">
      <Header />
      {/* <button
        onClick={showNotif}
        className="bg-blue-500 text-white px-4 py-2 rounded m-4"
      >
        Tampilkan Notifikasi
      </button> */}
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
