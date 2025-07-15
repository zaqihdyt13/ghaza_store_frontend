import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/cart`,
          config
        );
        setCartItems(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to fetch cart");
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/cart/${itemId}`,
        { quantity: newQuantity },
        config
      );

      setCartItems((items) =>
        items.map((item) =>
          item?.cart_id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      alert("Failed to update quantity");
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/cart/${itemId}`,
        config
      );
      setCartItems((items) => items.filter((item) => item?.cart_id !== itemId));
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/shipping-rates`)
      .then((response) => setCities(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    const selected = cities.find((c) => c.city === city);
    setShippingCost(selected ? selected.shipping_cost : 0);
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = shippingCost; 
  const total = subtotal + shippingCost;

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 my-10">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">Product</th>
                    <th className="text-left font-semibold">Price</th>
                    <th className="text-left font-semibold">Quantity</th>
                    <th className="text-left font-semibold">Total</th>
                    <th className="text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <tr key={item?.cart_id} className="border-b">
                        <td className="py-4">
                          <div className="flex items-center">
                            <img
                              className="h-16 w-16 mr-4 object-cover"
                              src={
                                item.image_url ||
                                "https://via.placeholder.com/150"
                              }
                              alt={item.name}
                            />
                            <span className="font-semibold">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-4">Rp {item.price.toLocaleString()}</td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <button
                              className="border rounded-md py-2 px-4 mr-2"
                              onClick={() =>
                                updateQuantity(item.cart_id, item.quantity - 1)
                              }
                            >
                              -
                            </button>
                            <span className="text-center w-8">
                              {item.quantity}
                            </span>
                            <button
                              className="border rounded-md py-2 px-4 ml-2"
                              onClick={() =>
                                updateQuantity(item.cart_id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4">
                          Rp {(item.price * item.quantity).toLocaleString()}
                        </td>
                        <td className="py-4">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeItem(item.cart_id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-10 text-gray-500"
                      >
                        {error
                          ? "Cart is empty or not available"
                          : "Cart is empty"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <label htmlFor="city">Kota Pengiriman:</label>
            <select id="city" value={selectedCity} onChange={handleCityChange}>
              <option value="">Pilih Kota</option>
              {cities.map((c) => (
                <option key={c.city} value={c.city}>
                  {c.city}
                </option>
              ))}
            </select>
            <p>Ongkos Kirim: Rp {shippingCost.toLocaleString()}</p>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString()}</span>
              </div>
              {/* <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div> */}
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Rp {shipping.toLocaleString()}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">Rp {total.toLocaleString()}</span>
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                onClick={() =>
                  navigate("/order", {
                    state: {
                      cartItems,
                      subtotal,
                      shippingCost,
                      selectedCity,
                    },
                  })
                }
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
