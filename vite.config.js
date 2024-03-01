import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3700, // Change this to your desired port number
  },
  base: "/",
  plugins: [react()],
});
// const path = require("path");

// export default {
//   root: path.resolve(__dirname, "src"),
//   build: {
//     outDir: "../dist",
//   },
//   server: {
//     port: 8080,
//   },
// };
