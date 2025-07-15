import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image_url: "",
    description: "",
    // rating: "",
    sold_count: "",
    categories: [],
    colors: [],
    sizes: [],
  });

  const [allCategories, setAllCategories] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const [allSizes, setAllSizes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, catRes, colorRes, sizeRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/categories`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/colors`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sizes`),
        ]);

        const product = productRes.data;

        setForm({
          name: product.name,
          price: product.price,
          image_url: product.image_url,
          description: product.description,
          // rating: product.rating || "",
          sold_count: product.sold_count || "",
          categories: product.categories?.map((c) => c.name) || [],
          colors: product.colors?.map((c) => c.color_name) || [],
          sizes: product.sizes?.map((s) => s.size_name) || [],
        });

        setAllCategories(catRes.data);
        setAllColors(colorRes.data);
        setAllSizes(sizeRes.data);
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

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      const currentValues = prev[field];
      if (checked) {
        return { ...prev, [field]: [...currentValues, value] };
      } else {
        return {
          ...prev,
          [field]: currentValues.filter((item) => item !== value),
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    // formData.append("rating", form.rating || 0);
    formData.append("sold_count", form.sold_count || 0);
    formData.append("categories", JSON.stringify(form.categories));
    formData.append("colors", JSON.stringify(form.colors));
    formData.append("sizes", JSON.stringify(form.sizes));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6">Edit Produk</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
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

        <div>
          <label className="block font-medium mb-1">Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            rows={4}
          />
        </div>

        {/* <div>
          <label className="block font-medium mb-1">Rating</label>
          <input
            type="number"
            name="rating"
            step="0.1"
            max="5"
            min="0"
            value={form.rating}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div> */}

        <div>
          <label className="block font-medium mb-1">Sold Count</label>
          <input
            type="number"
            name="sold_count"
            value={form.sold_count}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Categories</label>
          <div className="flex flex-wrap gap-3">
            {allCategories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={cat.name}
                  checked={form.categories.includes(cat.name)}
                  onChange={(e) => handleCheckboxChange(e, "categories")}
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Colors</label>
          <div className="flex flex-wrap gap-3">
            {allColors.map((color) => (
              <label key={color.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={color.color_name}
                  checked={form.colors.includes(color.color_name)}
                  onChange={(e) => handleCheckboxChange(e, "colors")}
                />
                {color.color_name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Sizes</label>
          <div className="flex flex-wrap gap-3">
            {allSizes.map((size) => (
              <label key={size.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={size.size_name}
                  checked={form.sizes.includes(size.size_name)}
                  onChange={(e) => handleCheckboxChange(e, "sizes")}
                />
                {size.size_name}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Edit Produk
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
