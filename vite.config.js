// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import tailwindcss from "@tailwindcss/vite";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss()
//   ],
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import tailwindcss from "@tailwindcss/vite";
// import { VitePWA } from "vite-plugin-pwa";

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//     VitePWA({
//       registerType: "autoUpdate",
//       includeAssets: [
//         "favicon.svg",
//         "favicon.ico",
//         "robots.txt",
//         "apple-touch-icon.png",
//       ],
//       manifest: {
//         name: "Ghaza Store",
//         short_name: "GhazaStore",
//         description: "E-Commerce Toko Pakaian Ghaza Store",
//         theme_color: "#ffffff",
//         background_color: "#ffffff",
//         display: "standalone",
//         orientation: "portrait",
//         icons: [
//           {
//             src: "/pwa-192x192.png",
//             sizes: "192x192",
//             type: "image/png",
//           },
//           {
//             src: "/pwa-512x512.png",
//             sizes: "512x512",
//             type: "image/png",
//           },
//           {
//             src: "/pwa-512x512.png",
//             sizes: "512x512",
//             type: "image/png",
//             purpose: "any maskable",
//           },
//         ],
//       },
//       workbox: {
//         navigateFallback: '/offline.html',
//         runtimeCaching: [
//           {
//             urlPattern: ({ request }) => request.destination === "document",
//             handler: "NetworkFirst",
//             options: {
//               cacheName: "html-cache",
//             },
//           },
//           {
//             urlPattern: ({ request }) => request.destination === "image",
//             handler: "CacheFirst",
//             options: {
//               cacheName: "image-cache",
//               expiration: {
//                 maxEntries: 50,
//                 maxAgeSeconds: 60 * 60 * 24 * 7, // 1 minggu
//               },
//             },
//           },
//         ],
//       },
//     }),
//   ],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "Ghaza Store",
        short_name: "GhazaStore",
        description: "E-Commerce Toko Pakaian Ghaza Store",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/index.html", // ✅ PENTING untuk SPA seperti React
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 minggu
              },
            },
          },
        ],
      },
    }),
  ],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        // target: 'https://conducted-dover-nextel-monitoring.trycloudflare.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // 🔐 Izinkan host dari ngrok saat preview
  // preview: {
  //   allowedHosts: [
  //     ".ngrok-free.app"],
  //   host: true,
  //   port: 4173,
  // },

  preview: {
    host: true, // agar listen di 0.0.0.0
    port: 4173, // atau port lain yang kamu mau
    // allowedHosts jika perlu (untuk keamanan)
    allowedHosts: [
      ".trycloudflare.com",
      "localhost",
      "192.168.1.2",
      ".ngrok-free.app",
    ],
  },
});
