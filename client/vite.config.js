import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const serverPort = 3000; // Specify the backend port
console.log(`API needs to be running on port ${serverPort}`);

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/cars": {
        target: `http://localhost:${serverPort}`, // Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
