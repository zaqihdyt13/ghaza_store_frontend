import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditColor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    color_name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const colRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/colors/${id}`
        );

        const color = colRes.data;

        setForm({
          color_name: color.color_name,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { color_name, value } = e.target;
    setForm((prev) => ({ ...prev, [color_name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedCol = {
      color_name: form.color_name,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/colors/${id}`,
        updatedCol
      );
      alert("Category updated successfully!");
      navigate("/admin/categories");
    } catch (err) {
      console.error(err);
      alert("Failed to update category.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6">Edit Warna</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="color_name"
            value={form.color_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        {/* <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div> */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Edit Warna
        </button>
      </form>
    </div>
  );
};

export default EditColor;
