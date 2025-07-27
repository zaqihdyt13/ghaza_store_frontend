// import { useState, useEffect, useCallback } from "react";
// import {
//   Package,
//   Clock,
//   CreditCard,
//   Truck,
//   CheckCircle,
//   Star,
//   MapPin,
//   Calendar,
//   Eye,
//   X,
//   DollarSign,
// } from "lucide-react";
// import Header from "../components/Header";

// const MyOrderPage = () => {
//   const [activeTab, setActiveTab] = useState("pending");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [paymentLoading, setPaymentLoading] = useState(false);

//   // Status mapping sesuai dengan database
//   const tabs = [
//     {
//       key: "pending",
//       label: "Diproses",
//       icon: Clock,
//       color: "text-orange-500",
//     },
//     {
//       key: "paid",
//       label: "Dibayar",
//       icon: CreditCard,
//       color: "text-green-500",
//     },
//     { key: "shipped", label: "Diantar", icon: Truck, color: "text-blue-500" },
//     {
//       key: "delivered",
//       label: "Diterima",
//       icon: CheckCircle,
//       color: "text-purple-500",
//     },
//     {
//       key: "completed",
//       label: "Selesai",
//       icon: Star,
//       color: "text-yellow-500",
//     },
//   ];

//   // Fungsi untuk mendapatkan token dari localStorage
//   const getAuthToken = () => {
//     return localStorage.getItem("token") || sessionStorage.getItem("token");
//   };

//   // Load Midtrans Snap script
//   const loadMidtransScript = () => {
//     return new Promise((resolve, reject) => {
//       if (window.snap) {
//         resolve(window.snap);
//         return;
//       }

//       const script = document.createElement("script");
//       script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; // Ganti ke https://app.midtrans.com/snap/snap.js untuk production
//       script.setAttribute("data-client-key", "YOUR_CLIENT_KEY"); // Ganti dengan client key Midtrans Anda
//       script.onload = () => resolve(window.snap);
//       script.onerror = () =>
//         reject(new Error("Failed to load Midtrans script"));
//       document.head.appendChild(script);
//     });
//   };

//   // Handle payment
//   // Handle payment - fungsi yang diperbarui
//   const handlePayment = async (order) => {
//     try {
//       setPaymentLoading(true);

//       // Load Midtrans script jika belum ada
//       await loadMidtransScript();

//       // Get snap token dari backend menggunakan midtrans_order_id
//       const token = getAuthToken();

//       // Debug: log URL yang akan dipanggil
//       console.log(
//         "Calling API:",
//         `${import.meta.env.VITE_API_BASE_URL}/api/order/payment/${order.midtrans_order_id}`
//       );
//       console.log("Order data:", order);

//       const response = await fetch(
//         `${import.meta.env.VITE_API_BASE_URL}/api/order/payment/${order.midtrans_order_id}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Debug: log response
//       console.log("Response status:", response.status);
//       console.log("Response headers:", response.headers);

//       // Cek content-type sebelum parsing JSON
//       const contentType = response.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         const textResponse = await response.text();
//         console.error("Non-JSON response:", textResponse);
//         throw new Error(
//           `Server mengembalikan ${contentType} alih-alih JSON. Status: ${response.status}`
//         );
//       }

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || `HTTP Error: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("API Response:", data);

//       // Validasi response
//       if (!data.success || !data.snap_token) {
//         throw new Error("Snap token tidak tersedia dalam response");
//       }

//       const snapToken = data.snap_token;

//       // Buka Midtrans Snap
//       window.snap.pay(snapToken, {
//         onSuccess: async (result) => {
//           console.log("Payment success:", result);
//           alert("Pembayaran berhasil!");

//           // Update status order di frontend
//           setOrders((prev) =>
//             prev.map((o) => (o.id === order.id ? { ...o, status: "paid" } : o))
//           );

//           // Refresh orders dari server
//           await fetchOrders();
//         },
//         onPending: (result) => {
//           console.log("Payment pending:", result);
//           alert(
//             "Pembayaran sedang diproses. Silakan cek status pembayaran Anda."
//           );
//         },
//         onError: (result) => {
//           console.log("Payment error:", result);
//           alert("Pembayaran gagal. Silakan coba lagi.");
//         },
//         onClose: () => {
//           console.log("Payment popup closed");
//           alert(
//             "Jendela pembayaran ditutup. Anda dapat mencoba lagi kapan saja."
//           );
//         },
//       });
//     } catch (error) {
//       console.error("Payment error:", error);
//       alert(`Terjadi kesalahan: ${error.message}`);
//     } finally {
//       setPaymentLoading(false);
//     }
//   };

//   // Fetch orders dari API
//   const fetchOrders = useCallback(async () => {
//     try {
//       setLoading(true);
//       const token = getAuthToken();

//       if (!token) {
//         console.error("No auth token found");
//         return;
//       }

//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/order/orders`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setOrders(data);
//       } else {
//         console.error("Failed to fetch orders:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Fetch order details
//   const fetchOrderDetails = async (orderId) => {
//     try {
//       const token = getAuthToken();
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/order/${orderId}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setOrderDetails(data);
//       } else {
//         console.error("Failed to fetch order details");
//       }
//     } catch (error) {
//       console.error("Error fetching order details:", error);
//     }
//   };

//   // Handle view order details
//   const handleViewOrder = async (order) => {
//     setSelectedOrder(order);
//     await fetchOrderDetails(order.id);
//     setShowModal(true);
//   };

//   // Close modal
//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedOrder(null);
//     setOrderDetails(null);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   // Filter orders by status
//   const filteredOrders = orders.filter((order) => order.status === activeTab);

//   // Format currency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("id-ID", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Get status badge color
//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       pending: {
//         bg: "bg-orange-100",
//         text: "text-orange-800",
//         label: "Menunggu Pembayaran",
//       },
//       paid: {
//         bg: "bg-green-100",
//         text: "text-green-800",
//         label: "Sudah Dibayar",
//       },
//       shipped: {
//         bg: "bg-blue-100",
//         text: "text-blue-800",
//         label: "Sedang Dikirim",
//       },
//       delivered: {
//         bg: "bg-purple-100",
//         text: "text-purple-800",
//         label: "Sudah Diterima",
//       },
//       completed: {
//         bg: "bg-yellow-100",
//         text: "text-yellow-800",
//         label: "Selesai",
//       },
//       cancelled: {
//         bg: "bg-red-100",
//         text: "text-red-800",
//         label: "Dibatalkan",
//       },
//       expired: {
//         bg: "bg-gray-100",
//         text: "text-gray-800",
//         label: "Kadaluarsa",
//       },
//     };

//     const config = statusConfig[status] || statusConfig.pending;
//     return (
//       <span
//         className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-200 rounded mb-6 w-64"></div>
//           <div className="flex space-x-4 mb-6">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <div key={i} className="h-10 bg-gray-200 rounded w-24"></div>
//             ))}
//           </div>
//           <div className="space-y-4">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="h-32 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Pesanan Saya</h1>

//         {/* Tabs */}
//         <div className="flex flex-wrap gap-2 mb-6 border-b">
//           {tabs.map((tab) => {
//             const IconComponent = tab.icon;
//             const count = orders.filter(
//               (order) => order.status === tab.key
//             ).length;

//             return (
//               <button
//                 key={tab.key}
//                 onClick={() => setActiveTab(tab.key)}
//                 className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-medium transition-colors ${
//                   activeTab === tab.key
//                     ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                 }`}
//               >
//                 <IconComponent
//                   size={18}
//                   className={
//                     activeTab === tab.key ? "text-blue-500" : tab.color
//                   }
//                 />
//                 {tab.label}
//                 {count > 0 && (
//                   <span
//                     className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
//                       activeTab === tab.key
//                         ? "bg-blue-100 text-blue-600"
//                         : "bg-gray-100 text-gray-600"
//                     }`}
//                   >
//                     {count}
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//         </div>

//         {/* Orders List */}
//         <div className="space-y-4">
//           {filteredOrders.length === 0 ? (
//             <div className="text-center py-12">
//               <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 Belum ada pesanan
//               </h3>
//               <p className="text-gray-500">
//                 Anda belum memiliki pesanan dengan status{" "}
//                 {tabs.find((t) => t.key === activeTab)?.label.toLowerCase()}.
//               </p>
//             </div>
//           ) : (
//             filteredOrders.map((order) => (
//               <div
//                 key={order.id}
//                 className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
//               >
//                 <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-start justify-between mb-3">
//                       <div>
//                         <h3 className="font-semibold text-gray-900 text-lg">
//                           Order #{order.id}
//                         </h3>
//                         <p className="text-sm text-gray-500 mt-1">
//                           ID Midtrans: {order.midtrans_order_id}
//                         </p>
//                       </div>
//                       {getStatusBadge(order.status)}
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <Calendar size={16} />
//                         {formatDate(order.created_at)}
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <MapPin size={16} />
//                         {order.city}
//                       </div>
//                     </div>

//                     <div className="text-sm text-gray-600 mb-3">
//                       <span className="font-medium">Alamat:</span>{" "}
//                       {order.address}
//                     </div>

//                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
//                       <div>
//                         <span className="text-sm text-gray-600">Total:</span>
//                         <span className="ml-2 text-xl font-bold text-gray-900">
//                           {formatCurrency(order.total_price)}
//                         </span>
//                         {order.shipping_cost && (
//                           <span className="ml-2 text-xs text-gray-500">
//                             (termasuk ongkir{" "}
//                             {formatCurrency(order.shipping_cost)})
//                           </span>
//                         )}
//                       </div>

//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleViewOrder(order)}
//                           className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                         >
//                           <Eye size={16} />
//                           Lihat Detail
//                         </button>

//                         {/* Tombol Bayar - hanya muncul untuk status pending */}
//                         {order.status === "pending" && (
//                           <button
//                             onClick={() => handlePayment(order)}
//                             disabled={paymentLoading}
//                             className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//                           >
//                             <DollarSign size={16} />
//                             {paymentLoading ? "Memproses..." : "Bayar Sekarang"}
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Order Details Modal */}
//         {showModal && selectedOrder && orderDetails && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Detail Pesanan #{selectedOrder.id}
//                   </h2>
//                   <button
//                     onClick={closeModal}
//                     className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                   >
//                     <X size={24} />
//                   </button>
//                 </div>
//               </div>

//               <div className="p-6">
//                 {/* Order Info */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div>
//                     <h3 className="font-semibold text-gray-900 mb-3">
//                       Informasi Pesanan
//                     </h3>
//                     <div className="space-y-2 text-sm">
//                       <div>
//                         <span className="text-gray-600">ID Midtrans:</span>
//                         <span className="ml-2 font-medium">
//                           {selectedOrder.midtrans_order_id}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-gray-600">Tanggal:</span>
//                         <span className="ml-2">
//                           {formatDate(selectedOrder.created_at)}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-gray-600">Status:</span>
//                         <span className="ml-2">
//                           {getStatusBadge(selectedOrder.status)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="font-semibold text-gray-900 mb-3">
//                       Alamat Pengiriman
//                     </h3>
//                     <div className="text-sm">
//                       <p className="text-gray-600">
//                         Kota:{" "}
//                         <span className="text-gray-900">
//                           {selectedOrder.city}
//                         </span>
//                       </p>
//                       <p className="text-gray-600 mt-1">Alamat:</p>
//                       <p className="text-gray-900">{selectedOrder.address}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Order Items */}
//                 <div className="mb-6">
//                   <h3 className="font-semibold text-gray-900 mb-4">
//                     Produk yang Dipesan
//                   </h3>
//                   <div className="space-y-4">
//                     {orderDetails.items &&
//                       orderDetails.items.map((item) => (
//                         <div
//                           key={item.id}
//                           className="flex gap-4 p-4 border border-gray-200 rounded-lg"
//                         >
//                           <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
//                             {item.image_url ? (
//                               <img
//                                 src={item.image_url}
//                                 alt={item.name}
//                                 className="w-full h-full object-cover"
//                               />
//                             ) : (
//                               <div className="w-full h-full flex items-center justify-center">
//                                 <Package size={24} className="text-gray-400" />
//                               </div>
//                             )}
//                           </div>

//                           <div className="flex-1">
//                             <h4 className="font-medium text-gray-900 mb-1">
//                               {item.name}
//                             </h4>
//                             {item.description && (
//                               <p className="text-sm text-gray-600 mb-2 line-clamp-2">
//                                 {item.description}
//                               </p>
//                             )}

//                             <div className="flex flex-wrap gap-4 text-sm">
//                               <span className="text-gray-600">
//                                 Ukuran:{" "}
//                                 <span className="font-medium">
//                                   {item.size || "N/A"}
//                                 </span>
//                               </span>
//                               <span className="text-gray-600">
//                                 Warna:{" "}
//                                 <span className="font-medium">
//                                   {item.color || "N/A"}
//                                 </span>
//                               </span>
//                               <span className="text-gray-600">
//                                 Qty:{" "}
//                                 <span className="font-medium">
//                                   {item.quantity}
//                                 </span>
//                               </span>
//                             </div>

//                             <div className="flex justify-between items-center mt-2">
//                               <span className="text-sm text-gray-600">
//                                 @ {formatCurrency(item.price)}
//                               </span>
//                               <span className="font-semibold text-gray-900">
//                                 {formatCurrency(item.subtotal)}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>

//                 {/* Order Summary */}
//                 <div className="border-t pt-4">
//                   <div className="flex justify-between items-center mb-3">
//                     <h3 className="font-semibold text-gray-900">
//                       Ringkasan Pembayaran
//                     </h3>

//                     {/* Tombol Bayar di Modal */}
//                     {selectedOrder.status === "pending" && (
//                       <button
//                         onClick={() => handlePayment(selectedOrder)}
//                         disabled={paymentLoading}
//                         className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//                       >
//                         <DollarSign size={16} />
//                         {paymentLoading ? "Memproses..." : "Bayar Sekarang"}
//                       </button>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     {selectedOrder.shipping_cost && (
//                       <>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">
//                             Subtotal Produk:
//                           </span>
//                           <span>
//                             {formatCurrency(
//                               selectedOrder.total_price -
//                                 selectedOrder.shipping_cost
//                             )}
//                           </span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">Ongkos Kirim:</span>
//                           <span>
//                             {formatCurrency(selectedOrder.shipping_cost)}
//                           </span>
//                         </div>
//                       </>
//                     )}
//                     <div className="flex justify-between text-lg font-bold border-t pt-2">
//                       <span>Total:</span>
//                       <span>{formatCurrency(selectedOrder.total_price)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MyOrderPage;

import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Package,
  Clock,
  CreditCard,
  Truck,
  CheckCircle,
  Star,
  MapPin,
  Calendar,
  Eye,
  X,
  DollarSign,
} from "lucide-react";
import Header from "../components/Header";

const MyOrderPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // PERBAIKAN: Gunakan object untuk track loading per order
  const [paymentLoading, setPaymentLoading] = useState({});

  // Status mapping sesuai dengan database
  const tabs = [
    {
      key: "pending",
      label: "Diproses",
      icon: Clock,
      color: "text-orange-500",
    },
    {
      key: "paid",
      label: "Dibayar",
      icon: CreditCard,
      color: "text-green-500",
    },
    { key: "shipped", label: "Diantar", icon: Truck, color: "text-blue-500" },
    {
      key: "delivered",
      label: "Diterima",
      icon: CheckCircle,
      color: "text-purple-500",
    },
    {
      key: "completed",
      label: "Selesai",
      icon: Star,
      color: "text-yellow-500",
    },
  ];

  // Fungsi untuk mendapatkan token dari localStorage
  const getAuthToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  // Load Midtrans Snap script
  const loadMidtransScript = () => {
    return new Promise((resolve, reject) => {
      if (window.snap) {
        resolve(window.snap);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", "SB-Mid-client-z_hbEe-ZvKb6Hyxf"); // GANTI dengan client key Anda
      script.onload = () => resolve(window.snap);
      script.onerror = () =>
        reject(new Error("Failed to load Midtrans script"));
      document.head.appendChild(script);
    });
  };

  // PERBAIKAN: Handle payment dengan order-specific loading dan validasi lengkap
  const handlePayment = async (order) => {
    // Cegah multiple click pada order yang sama
    if (paymentLoading[order.id]) {
      console.log("Payment already in progress for order:", order.id);
      return;
    }

    // Validasi order status
    if (order.status !== "pending") {
      alert("Order ini tidak dapat dibayar karena statusnya bukan pending");
      return;
    }

    // Validasi midtrans_order_id
    if (!order.midtrans_order_id) {
      alert("Midtrans Order ID tidak ditemukan");
      return;
    }

    try {
      // Set loading untuk order spesifik
      setPaymentLoading((prev) => ({ ...prev, [order.id]: true }));

      // Load Midtrans script jika belum ada
      await loadMidtransScript();

      const token = getAuthToken();
      if (!token) {
        throw new Error("Token authentication tidak ditemukan");
      }

      // Debug information
      console.log("=== PAYMENT DEBUG INFO ===");
      console.log("Order ID:", order.id);
      console.log("Midtrans Order ID:", order.midtrans_order_id);
      console.log("Order Status:", order.status);
      console.log("Total Price:", order.total_price);

      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/order/payment/${
        order.midtrans_order_id
      }`;
      console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response Status:", response.status);
      console.log("Response OK:", response.ok);

      // Handle different error responses
      if (!response.ok) {
        let errorMessage = `HTTP Error ${response.status}`;

        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } else {
            const errorText = await response.text();
            console.error("Non-JSON Error Response:", errorText);

            if (response.status === 404) {
              errorMessage =
                "Endpoint pembayaran tidak ditemukan. Pastikan backend sudah diupdate.";
            }
          }
        } catch (parseError) {
          console.error("Error parsing error response:", parseError);
        }

        throw new Error(errorMessage);
      }

      // Parse JSON response
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text();
        console.error("Non-JSON response:", textResponse);
        throw new Error(`Server mengembalikan ${contentType} alih-alih JSON`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Validasi response structure
      if (!data.success) {
        throw new Error(data.message || "Response tidak valid dari server");
      }

      if (!data.snap_token) {
        throw new Error("Snap token tidak tersedia dalam response");
      }

      const snapToken = data.snap_token;
      console.log("Snap Token received:", snapToken.substring(0, 20) + "...");

      // Buka Midtrans Snap
      window.snap.pay(snapToken, {
        onSuccess: async (result) => {
          console.log("Payment success:", result);

          try {
            // Update status order di frontend
            setOrders((prev) =>
              prev.map((o) =>
                o.id === order.id ? { ...o, status: "paid" } : o
              )
            );

            // Refresh orders dari server
            await fetchOrders();

            alert("Pembayaran berhasil! Status pesanan akan diperbarui.");
          } catch (refreshError) {
            console.error("Error refreshing orders:", refreshError);
            alert(
              "Pembayaran berhasil, namun gagal memperbarui tampilan. Silakan refresh halaman."
            );
          }
        },
        onPending: (result) => {
          console.log("Payment pending:", result);
          alert(
            "Pembayaran sedang diproses. Silakan cek status pembayaran Anda."
          );
        },
        onError: (result) => {
          console.log("Payment error:", result);
          alert("Pembayaran gagal. Silakan coba lagi.");
        },
        onClose: () => {
          console.log("Payment popup closed");
          // Tidak perlu alert untuk onClose karena user mungkin sengaja menutup
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      alert(`Terjadi kesalahan: ${error.message}`);
    } finally {
      // Clear loading untuk order spesifik
      setPaymentLoading((prev) => {
        const newState = { ...prev };
        delete newState[order.id];
        return newState;
      });
    }
  };

  // Fetch orders dari API
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const token = getAuthToken();

      if (!token) {
        console.error("No auth token found");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/order/orders`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Orders fetched:", data.length);
        setOrders(data);
      } else {
        console.error(
          "Failed to fetch orders:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch order details
  const fetchOrderDetails = async (orderId) => {
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/order/${orderId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data);
      } else {
        console.error("Failed to fetch order details");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  // Handle view order details
  const handleViewOrder = async (order) => {
    setSelectedOrder(order);
    await fetchOrderDetails(order.id);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setOrderDetails(null);
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Filter orders by status
  const filteredOrders = orders.filter((order) => order.status === activeTab);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-orange-100",
        text: "text-orange-800",
        label: "Menunggu Pembayaran",
      },
      paid: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Sudah Dibayar",
      },
      shipped: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Sedang Dikirim",
      },
      delivered: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        label: "Sudah Diterima",
      },
      completed: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Selesai",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-800",
        label: "Dibatalkan",
      },
      expired: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        label: "Kadaluarsa",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  // PERBAIKAN: Component untuk render tombol bayar dengan prop validation
  const PaymentButton = ({ order }) => {
    const isLoading = paymentLoading[order.id];

    if (order.status !== "pending") return null;

    return (
      <button
        onClick={() => handlePayment(order)}
        disabled={isLoading}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        } text-white`}
      >
        <DollarSign size={16} />
        {isLoading ? "Memproses..." : "Bayar Sekarang"}
      </button>
    );
  };

  // PropTypes untuk PaymentButton
  PaymentButton.propTypes = {
    order: PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      midtrans_order_id: PropTypes.string,
      total_price: PropTypes.number,
      city: PropTypes.string,
      address: PropTypes.string,
      shipping_cost: PropTypes.number,
      created_at: PropTypes.string,
    }).isRequired,
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6 w-64"></div>
            <div className="flex space-x-4 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded w-24"></div>
              ))}
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Pesanan Saya</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const count = orders.filter(
              (order) => order.status === tab.key
            ).length;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-medium transition-colors ${
                  activeTab === tab.key
                    ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <IconComponent
                  size={18}
                  className={
                    activeTab === tab.key ? "text-blue-500" : tab.color
                  }
                />
                {tab.label}
                {count > 0 && (
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.key
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Belum ada pesanan
              </h3>
              <p className="text-gray-500">
                Anda belum memiliki pesanan dengan status{" "}
                {tabs.find((t) => t.key === activeTab)?.label.toLowerCase()}.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
              >
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          ID Midtrans: {order.midtrans_order_id}
                        </p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        {formatDate(order.created_at)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} />
                        {order.city}
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-3">
                      <span className="font-medium">Alamat:</span>{" "}
                      {order.address}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div>
                        <span className="text-sm text-gray-600">Total:</span>
                        <span className="ml-2 text-xl font-bold text-gray-900">
                          {formatCurrency(order.total_price)}
                        </span>
                        {order.shipping_cost && (
                          <span className="ml-2 text-xs text-gray-500">
                            (termasuk ongkir{" "}
                            {formatCurrency(order.shipping_cost)})
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Eye size={16} />
                          Lihat Detail
                        </button>

                        {/* PERBAIKAN: Gunakan PaymentButton component */}
                        <PaymentButton order={order} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Details Modal */}
        {showModal && selectedOrder && orderDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Detail Pesanan #{selectedOrder.id}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Order Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Informasi Pesanan
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">ID Midtrans:</span>
                        <span className="ml-2 font-medium">
                          {selectedOrder.midtrans_order_id}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Tanggal:</span>
                        <span className="ml-2">
                          {formatDate(selectedOrder.created_at)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span className="ml-2">
                          {getStatusBadge(selectedOrder.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Alamat Pengiriman
                    </h3>
                    <div className="text-sm">
                      <p className="text-gray-600">
                        Kota:{" "}
                        <span className="text-gray-900">
                          {selectedOrder.city}
                        </span>
                      </p>
                      <p className="text-gray-600 mt-1">Alamat:</p>
                      <p className="text-gray-900">{selectedOrder.address}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Produk yang Dipesan
                  </h3>
                  <div className="space-y-4">
                    {orderDetails.items &&
                      orderDetails.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                            {item.image_url ? (
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package size={24} className="text-gray-400" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">
                              {item.name}
                            </h4>
                            {item.description && (
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {item.description}
                              </p>
                            )}

                            <div className="flex flex-wrap gap-4 text-sm">
                              <span className="text-gray-600">
                                Ukuran:{" "}
                                <span className="font-medium">
                                  {item.size || "N/A"}
                                </span>
                              </span>
                              <span className="text-gray-600">
                                Warna:{" "}
                                <span className="font-medium">
                                  {item.color || "N/A"}
                                </span>
                              </span>
                              <span className="text-gray-600">
                                Qty:{" "}
                                <span className="font-medium">
                                  {item.quantity}
                                </span>
                              </span>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm text-gray-600">
                                @ {formatCurrency(item.price)}
                              </span>
                              <span className="font-semibold text-gray-900">
                                {formatCurrency(item.subtotal)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-900">
                      Ringkasan Pembayaran
                    </h3>

                    {/* PERBAIKAN: Tombol Bayar di Modal menggunakan PaymentButton */}
                    <PaymentButton order={selectedOrder} />
                  </div>

                  <div className="space-y-2">
                    {selectedOrder.shipping_cost && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            Subtotal Produk:
                          </span>
                          <span>
                            {formatCurrency(
                              selectedOrder.total_price -
                                selectedOrder.shipping_cost
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Ongkos Kirim:</span>
                          <span>
                            {formatCurrency(selectedOrder.shipping_cost)}
                          </span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span>{formatCurrency(selectedOrder.total_price)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrderPage;
