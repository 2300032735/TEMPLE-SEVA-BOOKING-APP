import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",      // makes paths relative (important for images/assets)
  server: {
    port: 3000,     // dev server port
  },
});
