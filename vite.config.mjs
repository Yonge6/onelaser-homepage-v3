import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "onelaser-homepage-v3";

export default defineConfig({
  base: `/${repositoryName}/`,
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), "index.html"),
        collections: resolve(process.cwd(), "collections/index.html"),
      },
    },
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
