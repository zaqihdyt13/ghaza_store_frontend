import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditAd = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    image_url: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adsRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/ads/${id}`
        );

        const ads = adsRes.data;

        setForm({
          title: ads.title,
          image_url: ads.image_url,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAds = {
      title: form.title,
      image_url: form.image_url,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/ads/${id}`,
        updatedAds
      );
      alert("Ads updated successfully!");
      navigate("/admin/ads");
    } catch (err) {
      console.error(err);
      alert("Failed to update ads.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6">Edit Papan Iklan</h2>
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
          Edit Iklan
        </button>
      </form>
    </div>
  );
};

export default EditAd;
