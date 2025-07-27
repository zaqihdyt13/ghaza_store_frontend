import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { IoListCircleOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const columnTranslations = {
  id: "No",
  name: "Nama Produk",
  price: "Harga",
  email: "Email",
  image_url: "Gambar",
  description: "Deskripsi",
  sold_count: "Total Terjual",
  rating: "Penilaian Produk",
  title: "Judul",
  username: "Nama",
  city: "Kota",
  address: "Alamat",
  total_price: "Total Pembayaran",
  created_at: "Tanggal",
};

// Format header
const formatHeader = (key) => {
  if (columnTranslations[key]) return columnTranslations[key];
  return key
    .replace(/_/g, " ")
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
};

const Tables = ({ apiUrl, editPath, hideDelete = false }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    if (!apiUrl) return;

    axios.get(apiUrl).then((res) => {
      const sorted = [...res.data].sort((a, b) => (a.id > b.id ? 1 : -1)); // Default ASC by id
      setData(sorted);
      if (sorted.length > 0) {
        setColumns(Object.keys(sorted[0]));
      } else {
        setColumns([]);
      }
    });
  }, [apiUrl]);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Apakah kamu yakin ingin menghapus produk ini?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`${apiUrl}/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Gagal menghapus produk");
      console.error(err);
    }
  };

  const handleSort = (column) => {
    let direction = "asc";
    if (sortColumn === column && sortDirection === "asc") {
      direction = "desc";
    }
    setSortColumn(column);
    setSortDirection(direction);

    const sortedData = [...data].sort((a, b) => {
      const valA = a[column];
      const valB = b[column];

      if (typeof valA === "string") {
        return direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return direction === "asc" ? valA - valB : valB - valA;
    });

    setData(sortedData);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="w-full mt-12">
      <p className="text-xl pb-3 flex items-center">
        <IoListCircleOutline className="mr-1 text-3xl" /> Tabel Pendataan
      </p>
      <div className="bg-white overflow-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
                No
              </th>
              {columns
                .filter((col) => col !== "id")
                .map((col) => (
                  <th
                    key={col}
                    className="text-center py-3 px-4 uppercase font-semibold text-sm cursor-pointer"
                    onClick={() => handleSort(col)}
                  >
                    {formatHeader(col)}{" "}
                    {sortColumn === col && (
                      <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                    )}
                  </th>
                ))}
              <th className="px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length || 1}
                  className="text-center py-6 text-gray-500"
                >
                  Tidak ada data untuk ditampilkan
                </td>
              </tr>
            ) : (
              currentData.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 1 ? "bg-gray-200" : ""}
                >
                  <td className="text-center py-3 px-4 font-medium">
                    {startIndex + index + 1}
                  </td>
                  {columns
                    .filter((col) => col !== "id")
                    .map((col) => (
                      <td key={col} className="text-center py-3 px-4">
                        {/* {col.toLowerCase().includes("email") ? (
                          <a
                            className="hover:text-blue-500"
                            href={`mailto:${item[col]}`}
                          >
                            {item[col]}
                          </a>
                        ) : col.toLowerCase().includes("phone") ? (
                          <a
                            className="hover:text-blue-500"
                            href={`tel:${item[col]}`}
                          >
                            {item[col]}
                          </a>
                        ) : (
                          item[col]
                        )} */}
                        {col === "image_url" ? (
                          <img
                            src={item.image_url}
                            alt="Produk"
                            className="w-16 h-16 object-cover mx-auto rounded"
                          />
                        ) : col.toLowerCase().includes("email") ? (
                          <a
                            className="hover:text-blue-500"
                            href={`mailto:${item[col]}`}
                          >
                            {item[col]}
                          </a>
                        ) : col.toLowerCase().includes("phone") ? (
                          <a
                            className="hover:text-blue-500"
                            href={`tel:${item[col]}`}
                          >
                            {item[col]}
                          </a>
                        ) : (
                          item[col]
                        )}
                      </td>
                    ))}
                  <td className="pl-4.5 text-center">
                    <button
                      onClick={() => navigate(`${editPath}/${item.id}`)}
                      className="bg-yellow-600 p-1 rounded-xl cursor-pointer hover:bg-yellow-300 transition-all mr-2"
                    >
                      <BiEdit className="text-white w-8 text-xl" />
                    </button>
                    {!hideDelete && (
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-600 p-1 rounded-xl cursor-pointer hover:bg-red-400 transition-all mr-2"
                      >
                        <MdDeleteOutline className="text-white w-8 text-xl" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-2">
        <p className="text-sm text-gray-600">
          Menampilkan {startIndex + 1}–
          {Math.min(startIndex + itemsPerPage, data.length)} dari {data.length}{" "}
          data
        </p>
        <div className="space-x-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Sebelumnya
          </button>
          <span className="text-sm font-medium">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Berikutnya
          </button>
        </div>
      </div>
    </div>
  );
};

Tables.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  editPath: PropTypes.string.isRequired,
  hideDelete: PropTypes.bool,
};

export default Tables;
