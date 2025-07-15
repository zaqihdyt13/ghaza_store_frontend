import { useEffect, useState } from "react";
import axios from "axios";
import { PiBellSimple } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId || !token) return;

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`/api/notifications/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications(res.data);
        const unread = res.data.filter((n) => !n.is_read).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error("Gagal fetch notifikasi:", err);
      }
    };

    fetchNotifications();
  }, [userId, token]); // tidak ada warning karena fetchNotifications tidak di luar useEffect

  const markAsRead = async (id) => {
    try {
      await axios.put(`/api/notifications/read/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh notifikasi setelah ditandai sebagai dibaca
      const res = await axios.get(`/api/notifications/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(res.data);
      const unread = res.data.filter((n) => !n.is_read).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error("Gagal update status baca:", err);
    }
  };

  const handleBellClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative">
      <button
        onClick={handleBellClick}
        className="relative w-10 h-10 flex justify-center items-center border rounded-2xl text-gray-500 hover:text-teal-500"
      >
        <PiBellSimple className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-72 bg-white border rounded shadow-lg z-50">
          <div className="p-2 font-semibold border-b">Notifikasi</div>
          {notifications.length === 0 ? (
            <div className="p-2 text-sm text-gray-500">
              Tidak ada notifikasi
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 text-sm cursor-pointer hover:bg-gray-100 border-b ${
                  notif.is_read ? "text-gray-500" : "font-semibold"
                }`}
                onClick={() => {
                    markAsRead(notif.id)
                    navigate(`/notifications/${notif.id}`);
                }}
              >
                <div>{notif.title}</div>
                <div className="text-xs text-gray-400">{notif.message}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
