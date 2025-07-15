import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser({
          username: res.data.user.username,
          email: res.data.user.email,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    axios
      .put(
        "http://localhost:5000/api/user/profile/update",
        { username: user.username, email: user.email },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setMessage(res.data.message);
        setIsSuccess(true);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        console.error(err);
        setIsSuccess(false);
      });
  };

  if (loading) return <div className="p-4">Memuat data...</div>;

  return (
    <>
      <Header />
      <div className="flex items-center justify-center bg-gradient-to-br from-teal-600 to-gray-600 px-6 py-12">
        <div className="bg-white rounded-xl shadow-md w-full max-w-5xl p-6 md:flex md:gap-8">
          {/* Bagian kiri (atau atas di HP): Info user */}
          <div className="md:w-1/2 w-full mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Data Pengguna
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Username:</span> {user.username}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
            </div>
          </div>

          {/* Bagian kanan (atau bawah di HP): Form update */}
          <div className="md:w-1/2 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Update Profil
            </h2>

            {message && (
              <div
                className={`mb-3 ${
                  isSuccess ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded"
              >
                Simpan Perubahan
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
