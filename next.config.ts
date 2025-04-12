import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript:{
        ignoreBuildErrors:true,
    },
    eslint:{
        ignoreDuringBuilds:true,
    },
    webpack: (config) => {
        // Configure path aliases
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname),
            "@/lib": path.resolve(__dirname, "lib")
        };
        return config;
    }
};

export default nextConfig;