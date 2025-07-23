import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post("http://localhost:5000/api/auth/login", {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("role", res.data.user.role);
      // navigate("/");

      const role = res.data.user.role;
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login gagal");
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Masuk ke</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-teal-500 barriecito-regular">
              ghazaStore
            </h2>
            <p className="max-w-md opacity-90">
              Selamat datang kembali! Masuk untuk melanjutkan belanja.
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12 md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
          <div className="text-right mb-4">
            <span className="text-gray-500">Belum punya akun?</span>
            <a href="/auth/register" className="text-blue-500 font-medium">
              Daftar
            </a>
          </div>

          <div className="mb-8">
            <p className="text-gray-600 mb-1">
              Selamat datang di{" "}
              <span className="font-bold text-teal-500 barriecito-regular">
                ghazaStore
              </span>
            </p>
            <h1 className="text-4xl font-bold">Masuk</h1>
          </div>

          <form onSubmit={handleLogin}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email"
                  className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-2 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span
                  className="absolute right-3 top-13 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>
              <div className="text-right">
                <a href="#" className="text-teal-500 text-sm">
                  Lupa Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition duration-200"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
