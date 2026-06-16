import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const shikimoriUrl = env.VITE_SHIKIMORI_URL || "https://shikimori.one";
  const contactEmail = env.VITE_CONTACT_EMAIL || "arsershoff@gmail.com";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: shikimoriUrl,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
          headers: {
            "User-Agent": `AniGurt/1.0 (${contactEmail})`,
          },
        },
      },
    },
  };
});
