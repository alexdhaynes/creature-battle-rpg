import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@game": path.resolve(__dirname, "./src/game"),
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
  },
});
