import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        // "http://localhost:5000/api/auth/register",
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
        form
      );
      alert(res.data.message);
      navigate("/auth/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registrasi gagal");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="bg-gray-900 text-white p-8 md:p-12 md:w-1/2 relative overflow-hidden">
        <div className="z-10 relative">
          <h2
            onClick={() => navigate("/")}
            className="text-2xl font-bold mb-6 text-teal-500 barriecito-regular cursor-pointer"
          >
            ghazaStore
          </h2>
          <div className="mt-20 md:mt-32">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Buat akun di
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-teal-500 barriecito-regular">
              ghazaStore
            </h2>
            <p className="max-w-md opacity-90">
              Bergabunglah dengan kami dan nikmati pengalaman belanja terbaik!
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12 md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
          <div className="text-right mb-4">
            <span className="text-gray-500">Sudah punya akun?</span>
            <a href="/auth/login" className="text-blue-500 font-medium">
              Masuk
            </a>
          </div>

          <div className="mb-8">
            <p className="text-gray-600 mb-1">
              Selamat datang di{" "}
              <span className="font-bold text-teal-500 barriecito-regular">
                ghazaStore
              </span>
            </p>
            <h1 className="text-4xl font-bold">Daftar</h1>
          </div>

          <form onSubmit={handleRegister}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  placeholder="Your username"
                  className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                  className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
                  className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition duration-200"
              >
                Daftar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
