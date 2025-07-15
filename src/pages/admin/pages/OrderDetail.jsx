import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await axios.get(`/api/order/${id}`);
        setOrder(res.data.order);
        setItems(res.data.items);
      } catch (err) {
        console.error("Failed to fetch order details:", err);
      }
    };

    fetchOrderDetail();
  }, [id]);

  const handleUpdateStatus = async () => {
    try {
      await axios.put(`/api/order/${order.id}/status`, { status: "shipped" });
      setOrder((prev) => ({ ...prev, status: "shipped" }));
      alert("Status berhasil diperbarui ke 'shipped'");
    } catch (err) {
      console.error("Gagal update status:", err);
      alert("Gagal memperbarui status");
    }
  };

  if (!order) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="text-xl font-semibold">Ordered Details</div>
      <div className="grid grid-cols-2 gap-4 bg-white shadow p-4 rounded">
        <div>
          <strong>Order No:</strong> {order.id}
        </div>
        <div>
          <strong>Status:</strong>{" "}
          <span className="bg-yellow-300 text-white px-2 rounded">
            {order.status}
          </span>
        </div>
        <div>
          <strong>Order Date:</strong>{" "}
          {new Date(order.created_at).toLocaleString()}
        </div>
        <div>
          <strong>Shipping Cost:</strong> Rp
          {order.shipping_cost.toLocaleString()}
        </div>
        <div>
          <strong>Address:</strong> {order.address}, {order.city}
        </div>
      </div>

      <div className="text-xl font-semibold">Ordered Items</div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">Rp{item.price.toLocaleString()}</td>
                <td className="p-2">Rp{item.subtotal.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xl font-semibold">Transactions</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white shadow p-4 rounded">
        <div>
          <strong>Subtotal:</strong> Rp
          {items.reduce((acc, item) => acc + item.subtotal, 0).toLocaleString()}
        </div>
        <div>
          <strong>Shipping:</strong> Rp{order.shipping_cost.toLocaleString()}
        </div>
        <div>
          <strong>Total:</strong> Rp{order.total_price.toLocaleString()}
        </div>
      </div>

      {order.status === "paid" && (
        <button
          onClick={handleUpdateStatus}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Tandai sebagai Shipped
        </button>
      )}
    </div>
  );
};

export default OrderDetail;
