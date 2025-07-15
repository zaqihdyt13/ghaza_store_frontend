import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditSize = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    size_name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sizRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/sizes/${id}`
        );

        const size = sizRes.data;

        setForm({
          size_name: size.size_name,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { size_name, value } = e.target;
    setForm((prev) => ({ ...prev, [size_name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSiz = {
      size_name: form.size_name,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/sizes/${id}`,
        updatedSiz
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
      <h2 className="text-2xl font-semibold mb-6">Edit Ukuran</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="color_name"
            value={form.size_name}
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
          Edit Ukuran
        </button>
      </form>
    </div>
  );
};

export default EditSize;
