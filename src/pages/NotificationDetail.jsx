import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const NotificationDetail = () => {
  const { id } = useParams(); // notif id
  const navigate = useNavigate();
  const [notif, setNotif] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/notifications/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotif(res.data);
      } catch (err) {
        console.error("Gagal ambil detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, token]);

  const handleConfirm = async () => {
    try {
      const orderId = notif?.message?.match(/ID #(\d+)/)?.[1]; 
      if (!orderId) return;

      await axios.put(
        `/api/order/${orderId}/status`,
        { status: "delivered" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Terima kasih! Barang dikonfirmasi telah diterima.");
      navigate("/"); 
    } catch (err) {
      console.error("Gagal update status:", err);
      alert("Gagal konfirmasi penerimaan.");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!notif)
    return <div className="p-4 text-red-500">Notifikasi tidak ditemukan.</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Detail Notifikasi</h1>
      <div className="bg-white shadow p-4 rounded border border-gray-200">
        <h2 className="text-lg font-bold">{notif.title}</h2>
        <p className="text-sm text-gray-600 mt-2">{notif.message}</p>
        <p className="text-xs text-gray-400 mt-1">
          {new Date(notif.created_at).toLocaleString()}
        </p>

        {notif.title?.includes("Telah Dikirim") && (
          <button
            onClick={handleConfirm}
            className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          >
            Konfirmasi Penerimaan Barang
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationDetail;
