/// <reference types="vitest/config" />

import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    analyzer({ analyzerMode: "static" }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    pool: "vmThreads",
    setupFiles: ["./src/lib/test-utils.tsx"],
    coverage: {
      provider: "v8",
      exclude: ["./src/apis/**"],
    },
  },
  resolve: {
    alias: {
      "@stocks/plot": path.resolve(import.meta.dirname, "./src/components/stocks/plot"),
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  css: {
    devSourcemap: true,
  },
  server: {
    port: 4173,
  },
});
