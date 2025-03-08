import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/graphql": {
        target: "https://shikimori.one",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/graphql/, "/api/graphql"),
        headers: {
          "User-Agent": "Anigurt/1.0 (arsershoff@gmail.com)",
        },
      },
    },
  },
});
