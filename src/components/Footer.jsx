import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-teal-500 font-bold text-2xl barriecito-regular">ghazaStore</h2>
          <p className="text-sm text-gray-400">
            Toko pakaian terpercaya yang menyediakan produk berkualitas dengan
            harga terjangkau.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Kategori</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Pakaian Pria
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Pakaian Wanita
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Aksesoris
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Promo
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Bantuan</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Cara Belanja
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Pengembalian
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Kontak Kami
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Hubungi Kami
          </h3>
          <p className="text-sm mb-2">Email: support@ghazastore.com</p>
          <p className="text-sm mb-4">WhatsApp: +62 812 3456 7890</p>
          <div className="flex space-x-4 text-xl text-gray-400">
            <a href="#" className="hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} ghazaStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
