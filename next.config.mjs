import withPWA from "next-pwa";

const nextConfig = {
    ...withPWA({
        dest: "public",
        register: true,
        skipWaiting: true,
        customWorkerDir: "public"
    })
};

export default nextConfig;
