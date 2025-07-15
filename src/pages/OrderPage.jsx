import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
  const location = useLocation();
  const {
    cartItems: passedCartItems = [],
    subtotal = 0,
    shippingCost = 0,
    selectedCity = "",
  } = location.state || {};

  const [cartItems] = useState(passedCartItems);
  const [address, setAddress] = useState("");
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [productDetails, setProductDetails] = useState({}); // Key: product_id, Value: detail

  // Load Midtrans Snap.js
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    );
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // Fetch all product details for items in cart
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const responses = await Promise.all(
          cartItems.map((item) =>
            axios.get(
              `${import.meta.env.VITE_API_BASE_URL}/api/products/${
                item.product_id
              }`
            )
          )
        );

        const details = {};
        responses.forEach((res, index) => {
          details[cartItems[index].product_id] = res.data;
        });

        setProductDetails(details);
      } catch (err) {
        console.error("Gagal mengambil detail produk:", err);
      }
    };

    fetchAllProducts();
    setSelectedSizes(cartItems.map(() => ""));
    setSelectedColors(cartItems.map(() => ""));
  }, [cartItems]);

  const handleSizeChange = (index, value) => {
    const updated = [...selectedSizes];
    updated[index] = value;
    setSelectedSizes(updated);
  };

  const handleColorChange = (index, value) => {
    const updated = [...selectedColors];
    updated[index] = value;
    setSelectedColors(updated);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!address.trim()) {
      alert("Masukkan alamat pengiriman");
      return;
    }

    for (let i = 0; i < cartItems.length; i++) {
      if (!selectedSizes[i] || !selectedColors[i]) {
        alert(`Pilih ukuran dan warna untuk produk ${cartItems[i].name}`);
        return;
      }
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      setOrderSubmitting(true);

      const orderPayload = {
        items: cartItems.map((item, i) => ({
          product_id: item.product_id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
          size: selectedSizes[i],
          color: selectedColors[i],
        })),
        subtotal,
        shipping_cost: shippingCost,
        total_price: subtotal + shippingCost,
        address,
        city: selectedCity,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/order`,
        orderPayload,
        config
      );

      const snapToken = response.data.snapToken;
      if (!snapToken) {
        alert("Gagal mendapatkan token pembayaran.");
        return;
      }

      window.snap.pay(snapToken, {
        onSuccess: () => alert("Pembayaran berhasil!"),
        onPending: () => alert("Pembayaran pending."),
        onError: (result) =>
          alert("Pembayaran gagal: " + JSON.stringify(result)),
        onClose: () => alert("Pembayaran dibatalkan."),
      });
    } catch (err) {
      console.error("Gagal saat mengirim pesanan:", err);
      alert("Gagal menyimpan pesanan");
    } finally {
      setOrderSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-6">Order Summary</h1>

        <div className="bg-white rounded shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Produk dalam Keranjang</h2>
          {cartItems.length === 0 ? (
            <p>Tidak ada item.</p>
          ) : (
            <ul className="divide-y">
              {cartItems.map((item, index) => {
                const product = productDetails[item.product_id] || {};
                const sizes = product.sizes || [];
                const colors = product.colors || [];

                return (
                  <li key={item.cart_id} className="py-2">
                    <div className="flex flex-col space-y-2">
                      <span>
                        {item.name} - {item.quantity} x Rp {item.price.toLocaleString()}
                      </span>
                      <div className="flex gap-4">
                        <select
                          className="border rounded px-2 py-1"
                          value={selectedSizes[index]}
                          onChange={(e) =>
                            handleSizeChange(index, e.target.value)
                          }
                          required
                        >
                          <option value="">Pilih Size</option>
                          {sizes.map((size) => (
                            <option key={size.id} value={size.size_name}>
                              {size.size_name}
                            </option>
                          ))}
                        </select>

                        <select
                          className="border rounded px-2 py-1"
                          value={selectedColors[index]}
                          onChange={(e) =>
                            handleColorChange(index, e.target.value)
                          }
                          required
                        >
                          <option value="">Pilih Warna</option>
                          {colors.map((color) => (
                            <option key={color.id} value={color.color_name}>
                              {color.color_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="bg-white rounded shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Detail Pengiriman</h2>
          <p>
            <strong>Kota:</strong> {selectedCity || "Belum dipilih"}
          </p>
          <p>
            <strong>Ongkir:</strong> Rp {shippingCost.toLocaleString()}
          </p>
          <p>
            <strong>Subtotal:</strong> Rp {subtotal.toLocaleString()}
            {/* <strong>Subtotal:</strong> Rp {subtotal.toFixed(2)} */}
          </p>
          <p>
            <strong>Total:</strong> Rp {(subtotal + shippingCost).toLocaleString()}
            {/* <strong>Total:</strong> ${(subtotal + shippingCost).toFixed(2)} */}
          </p>
        </div>

        <form
          onSubmit={handleOrderSubmit}
          className="bg-white rounded shadow p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Alamat Pengiriman</h2>
          <textarea
            className="w-full border p-2 rounded"
            rows="4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Masukkan alamat lengkap..."
            required
          />
          <button
            type="submit"
            disabled={orderSubmitting}
            className="bg-blue-600 text-white px-6 py-2 mt-4 rounded hover:bg-blue-700"
          >
            {orderSubmitting ? "Memproses..." : "Lanjut Bayar"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default OrderPage;
