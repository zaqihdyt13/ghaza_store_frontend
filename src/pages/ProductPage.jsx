import { useEffect, useState, Fragment } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const ProductPage = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sortOption, setSortOption] = useState("popular");
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    color: [],
  });
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search")?.toLowerCase() || "";
  const navigate = useNavigate();

  const API_PRODUCTS = `${import.meta.env.VITE_API_BASE_URL}/api/products`;
  const API_CATEGORIES = `${import.meta.env.VITE_API_BASE_URL}/api/categories`;
  const API_COLORS = `${import.meta.env.VITE_API_BASE_URL}/api/colors`;

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesRes, colorsRes] = await Promise.all([
          fetch(API_CATEGORIES),
          fetch(API_COLORS),
        ]);
        const categoriesData = await categoriesRes.json();
        const colorsData = await colorsRes.json();
        setCategories(categoriesData);
        setColors(colorsData);

        // ✅ Ambil kategori dari URL jika ada
        const categoryParam = searchParams.get("category");
        if (categoryParam) {
          setSelectedFilters((prev) => ({
            ...prev,
            category: [categoryParam.toLowerCase()],
          }));
        }
      } catch (error) {
        console.error("Failed to fetch filter data:", error);
      }
    };

    fetchFilters();
  }, [searchParams, API_CATEGORIES, API_COLORS]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();

        selectedFilters.category.forEach((cat) =>
          params.append("category", cat)
        );
        selectedFilters.color.forEach((col) => params.append("color", col));
        params.append("sort", sortOption);

        const url = `${API_PRODUCTS}?${params.toString()}`;
        const res = await fetch(url);
        const data = await res.json();

        // Filter manual berdasarkan keyword dari search bar
        const filtered = searchKeyword
          ? data.filter((product) =>
              product.name.toLowerCase().includes(searchKeyword)
            )
          : data;

        setProducts(filtered);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [selectedFilters, sortOption, searchKeyword, API_PRODUCTS]);

  const handleCheckboxChange = (sectionId, value) => {
    setSelectedFilters((prevFilters) => {
      const current = prevFilters[sectionId] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prevFilters, [sectionId]: updated };
    });
  };

  const filters = [
    {
      id: "category",
      name: "Kategori",
      options: categories.map((cat) => ({
        value: cat.name.toLowerCase(),
        label: cat.name,
      })),
    },
    {
      id: "color",
      name: "Warna",
      options: colors.map((color) => ({
        value: color.color_name.toLowerCase(),
        label: color.color_name,
      })),
    },
  ];

  return (
    <div className="bg-white">
      <Header />
      {/* Mobile Filter Dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        ></Dialog>
      </Transition.Root>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bagian sorting di atas */}
        <div className="flex justify-end py-4">
          <label
            htmlFor="sort"
            className="mr-2 text-sm font-medium text-gray-700"
          >
            Sort by:
          </label>
          <select
            id="sort"
            name="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="rounded-md border border-gray-300 bg-white py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <section className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Sidebar filters */}
            <form className="block lg:sticky top-28 self-start">
              {/* Tombol ALL di luar filter kategori/warna */}
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFilters({
                      category: [],
                      color: [],
                    });
                    navigate("/products");
                  }}
                  className="px-4 py-2 bg-gradient-to-tr from-teal-600 to-teal-400 text-white text-sm rounded hover:shadow-md transition-all shadow-teal-200 cursor-pointer"
                >
                  Tampilkan Semua Produk
                </button>
              </div>
              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="border-b border-gray-400 py-6"
                >
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex lg:w-full w-40 justify-between text-xl text-gray-400 font-medium">
                        {section.name}
                        {open ? (
                          <MinusIcon className="h-5 w-5" />
                        ) : (
                          <PlusIcon className="h-5 w-5" />
                        )}
                      </Disclosure.Button>
                      {/* <Disclosure.Panel className="mt-4 space-y-4">
                        {section.options.map((option, idx) => (
                          <div key={idx} className="flex items-center">
                            <input
                              id={`desktop-${section.id}-${idx}`}
                              type="checkbox"
                              checked={
                                selectedFilters[section.id]?.includes(
                                  option.value
                                ) || false
                              }
                              onChange={() =>
                                handleCheckboxChange(section.id, option.value)
                              }
                              className="h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <label
                              htmlFor={`desktop-${section.id}-${idx}`}
                              className="ml-3 text-sm text-gray-700"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </Disclosure.Panel> */}
                      <Disclosure.Panel className="mt-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                          {section.options.map((option, idx) => {
                            const isSelected = selectedFilters[
                              section.id
                            ]?.includes(option.value);
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() =>
                                  handleCheckboxChange(section.id, option.value)
                                }
                                className={`text-sm px-3 py-1 rounded-full border transition-all ${
                                  isSelected
                                    ? "bg-teal-600 text-white border-teal-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                }`}
                              >
                                {option.label}
                              </button>
                            );
                          })}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length === 0 ? (
                  <p className="text-gray-500 col-span-full">
                    No products match the selected filters.
                  </p>
                ) : (
                  products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="border rounded-lg p-4 shadow-sm hover:shadow-lg hover:shadow-teal-100"
                    >
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-48 object-contain"
                      />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {product.category}
                      </p>
                      <p className="text-indigo-600 font-semibold">
                        ${product.price}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;