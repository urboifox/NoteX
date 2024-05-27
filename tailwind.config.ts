import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // primary: "#D9C2AD",
                primary: "#e0e0e0",
            },
            container: {
                center: true,
                padding: "1rem",
                screens: {
                    "2xl": "1200px",
                },
            },
        },
    },
    plugins: [
        function ({ addBase }: any) {
            // Custom styles to override normalization
            addBase({
                "#fox-editor *": {
                    all: "revert",
                },
                "#fox-blog *": {
                    all: "revert",
                },
            });
        },
    ],
};
export default config;
