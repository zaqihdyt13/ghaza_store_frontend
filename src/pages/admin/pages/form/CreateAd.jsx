import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateAd = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    image_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAd = {
      title: form.title,
      image_url: form.image_url,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/ads`,
        newAd
      );
      alert("Ad created successfully!");
      navigate("/admin/ads");
    } catch (err) {
      console.error(err);
      alert("Failed to create ad.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6">Buat Papan Iklan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Buat Iklan
        </button>
      </form>
    </div>
  );
};

export default CreateAd;
