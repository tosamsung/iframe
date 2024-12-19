import { defineConfig } from "vite";
import { getMaps, getMapsOptimizers, getMapsScripts } from "wa-map-optimizer-vite";

const maps = getMaps();

export default defineConfig({
    base: "/",
    build: {
        outDir: 'dist', // Output directory for build files

        rollupOptions: {
            input: {
                index: "./index.html",
                ...getMapsScripts(maps),
            },
        },
    },
    plugins: [...getMapsOptimizers(maps)],
    server: {
        host: "localhost",
        port: 5174,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
            "Cache-Control": "no-cache, no-store, must-revalidate",
        },
        open: "/",
    },
});