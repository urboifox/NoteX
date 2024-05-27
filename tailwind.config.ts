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
            addBase({
                "#fox-editor *": {
                    // Custom styles to override normalization
                    all: "revert",
                },
                "pre *": {
                    // Additional styles specific to pre tags inside #fox-editor
                    all: "revert",
                },
            });
        },
    ],
};
export default config;
