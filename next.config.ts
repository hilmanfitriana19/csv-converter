import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // 👇 Your existing settings
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
                port: "",
                pathname: "/**",
            },
        ],
    },

    // 👇 Add these lines for subpath deployment
    basePath: "/csv-converter",
    assetPrefix: "/csv-converter",
    trailingSlash: true, // optional: ensures consistent URLs
};

export default nextConfig;
